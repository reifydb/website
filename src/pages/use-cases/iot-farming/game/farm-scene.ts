import Phaser from 'phaser';
import { preloadAssets, getCropFrame } from './asset-loader';
import { eventBus, EVENTS } from './event-bus';
import {
  createInitialState,
  simulationTick,
  syncToDb,
  getTile,
  getCropAt,
  getSensorAt,
  getActuatorAt,
  placeCrop,
  placeSensor,
  placeActuator,
  addRule,
  removeAt,
  harvestCrop,
} from '../engine/simulation';
import { GRID_WIDTH, GRID_HEIGHT, TILE_SIZE, BASE_TICK_MS } from '../engine/constants';
import type { GameState, ToolMode, CropType, SensorType, ActuatorType, Rule } from '../engine/types';
import type { WasmDB } from '@reifydb/wasm';

export class FarmScene extends Phaser.Scene {
  private gameState!: GameState;
  private db: WasmDB | null = null;

  // Tile sprites
  private grassTiles: Phaser.GameObjects.Image[] = [];
  private soilOverlays: Map<string, Phaser.GameObjects.Rectangle> = new Map();
  private cropSprites: Map<number, Phaser.GameObjects.Sprite> = new Map();
  private selectionRect: Phaser.GameObjects.Rectangle | null = null;
  private hoverRect: Phaser.GameObjects.Rectangle | null = null;

  // Weather
  private rainEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private weatherTint: Phaser.GameObjects.Rectangle | null = null;

  // Tick timing
  private tickAccumulator = 0;
  private syncCounter = 0;

  constructor() {
    super({ key: 'FarmScene' });
  }

  setDB(db: WasmDB): void {
    this.db = db;
  }

  preload(): void {
    preloadAssets(this);
  }

  create(): void {
    this.gameState = createInitialState();

    // Create grass background
    const grassVariants = [
      'grass-mid', 'grass-mid', 'grass-mid', 'grass-mid',
      'grass-flowers1', 'grass-flowers2', 'grass-detail1', 'grass-detail2',
    ];

    // Use a seeded random for consistent tile placement
    let seed = 42;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const variant = grassVariants[Math.floor(seededRandom() * grassVariants.length)];
        const img = this.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          variant,
        );
        img.setDepth(0);
        this.grassTiles.push(img);
      }
    }

    // Soil type overlays (tinted rectangles)
    for (const tile of this.gameState.tiles) {
      if (tile.soil_type !== 'normal') {
        const color = tile.soil_type === 'sandy' ? 0xdec98a : 0x8b6914;
        const rect = this.add.rectangle(
          tile.x * TILE_SIZE + TILE_SIZE / 2,
          tile.y * TILE_SIZE + TILE_SIZE / 2,
          TILE_SIZE, TILE_SIZE,
          color, 0.15,
        );
        rect.setDepth(1);
        this.soilOverlays.set(`${tile.x},${tile.y}`, rect);
      }
    }

    // Weather overlay (full canvas tint)
    this.weatherTint = this.add.rectangle(
      (GRID_WIDTH * TILE_SIZE) / 2,
      (GRID_HEIGHT * TILE_SIZE) / 2,
      GRID_WIDTH * TILE_SIZE,
      GRID_HEIGHT * TILE_SIZE,
      0x000000, 0,
    ).setDepth(100);

    // Rain particle emitter (hidden by default)
    this.rainEmitter = this.add.particles(0, 0, 'water-tiles', {
      frame: [0, 1, 2, 3],
      x: { min: 0, max: GRID_WIDTH * TILE_SIZE },
      y: -10,
      lifespan: 800,
      speedY: { min: 40, max: 60 },
      speedX: { min: -15, max: -5 },
      scale: 0.5,
      alpha: { start: 0.6, end: 0 },
      quantity: 2,
      frequency: 50,
    });
    this.rainEmitter.setDepth(101);
    this.rainEmitter.stop();

    // Hover highlight
    this.hoverRect = this.add.rectangle(0, 0, TILE_SIZE, TILE_SIZE, 0xffffff, 0.2)
      .setDepth(90)
      .setVisible(false);

    // Selection highlight
    this.selectionRect = this.add.rectangle(0, 0, TILE_SIZE, TILE_SIZE)
      .setStrokeStyle(1, 0x14b8a6, 1)
      .setFillStyle(0x14b8a6, 0.15)
      .setDepth(91)
      .setVisible(false);

    // Input handling
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const tileX = Math.floor(pointer.worldX / TILE_SIZE);
      const tileY = Math.floor(pointer.worldY / TILE_SIZE);
      if (tileX >= 0 && tileX < GRID_WIDTH && tileY >= 0 && tileY < GRID_HEIGHT) {
        this.hoverRect?.setPosition(
          tileX * TILE_SIZE + TILE_SIZE / 2,
          tileY * TILE_SIZE + TILE_SIZE / 2,
        );
        this.hoverRect?.setVisible(true);
      } else {
        this.hoverRect?.setVisible(false);
      }
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const tileX = Math.floor(pointer.worldX / TILE_SIZE);
      const tileY = Math.floor(pointer.worldY / TILE_SIZE);
      if (tileX < 0 || tileX >= GRID_WIDTH || tileY < 0 || tileY >= GRID_HEIGHT) return;

      this.handleTileClick(tileX, tileY);
    });

    // Listen for React events
    eventBus.on(EVENTS.TOOL_CHANGED, (mode: ToolMode) => {
      this.gameState.toolMode = mode;
    });

    eventBus.on(EVENTS.SPEED_CHANGED, (speed: number) => {
      this.gameState.speed = speed;
    });

    eventBus.on(EVENTS.RULE_ADDED, (rule: Omit<Rule, 'id'>) => {
      addRule(this.gameState, rule);
      this.emitStateUpdate();
    });

    eventBus.on(EVENTS.RULE_TOGGLED, (ruleId: number) => {
      const rule = this.gameState.rules.find(r => r.id === ruleId);
      if (rule) rule.enabled = !rule.enabled;
      this.emitStateUpdate();
    });

    eventBus.on(EVENTS.RULE_REMOVED, (ruleId: number) => {
      const idx = this.gameState.rules.findIndex(r => r.id === ruleId);
      if (idx >= 0) this.gameState.rules.splice(idx, 1);
      this.emitStateUpdate();
    });

    // Initial state emit
    this.emitStateUpdate();

    // Initial DB sync
    if (this.db) {
      syncToDb(this.gameState, this.db);
    }
  }

  update(_time: number, delta: number): void {
    if (this.gameState.speed === 0) return;

    const tickInterval = BASE_TICK_MS / this.gameState.speed;
    this.tickAccumulator += delta;

    while (this.tickAccumulator >= tickInterval) {
      this.tickAccumulator -= tickInterval;
      simulationTick(this.gameState);

      // Sync to DB every 5 ticks
      this.syncCounter++;
      if (this.syncCounter >= 5 && this.db) {
        syncToDb(this.gameState, this.db);
        this.syncCounter = 0;
      }
    }

    this.updateVisuals();
    this.emitStateUpdate();
  }

  private handleTileClick(x: number, y: number): void {
    const mode = this.gameState.toolMode;

    // Select mode
    if (mode === 'select') {
      this.gameState.selectedTile = { x, y };
      this.selectionRect?.setPosition(
        x * TILE_SIZE + TILE_SIZE / 2,
        y * TILE_SIZE + TILE_SIZE / 2,
      );
      this.selectionRect?.setVisible(true);
      eventBus.emit(EVENTS.TILE_CLICKED, { x, y });
      this.emitStateUpdate();
      return;
    }

    // Harvest mode
    if (mode === 'harvest') {
      if (harvestCrop(this.gameState, x, y)) {
        eventBus.emit(EVENTS.CROP_HARVESTED, { x, y });
      }
      this.emitStateUpdate();
      return;
    }

    // Remove mode
    if (mode === 'remove') {
      removeAt(this.gameState, x, y);
      this.emitStateUpdate();
      return;
    }

    // Plant crops
    if (mode.startsWith('plant_')) {
      const cropType = mode.replace('plant_', '') as CropType;
      placeCrop(this.gameState, cropType, x, y);
      this.emitStateUpdate();
      return;
    }

    // Place sensors
    if (mode.startsWith('place_') && mode.endsWith('_sensor')) {
      const sensorType = mode.replace('place_', '').replace('_sensor', '') as SensorType;
      placeSensor(this.gameState, sensorType, x, y);
      this.emitStateUpdate();
      return;
    }

    // Place actuators
    if (mode === 'place_sprinkler' || mode === 'place_heater' || mode === 'place_lamp') {
      const actuatorType = mode.replace('place_', '') as ActuatorType;
      placeActuator(this.gameState, actuatorType, x, y);
      this.emitStateUpdate();
      return;
    }
  }

  private updateVisuals(): void {
    // Update moisture overlay on tiles
    for (const tile of this.gameState.tiles) {
      const key = `moisture_${tile.x},${tile.y}`;
      let overlay = this.soilOverlays.get(key);

      // Show moisture as blue tint (higher moisture = more blue)
      if (tile.moisture > 0.6) {
        if (!overlay) {
          overlay = this.add.rectangle(
            tile.x * TILE_SIZE + TILE_SIZE / 2,
            tile.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE, TILE_SIZE,
            0x4488cc, (tile.moisture - 0.6) * 0.5,
          ).setDepth(1);
          this.soilOverlays.set(key, overlay);
        } else {
          overlay.setAlpha((tile.moisture - 0.6) * 0.5);
        }
      } else if (overlay) {
        overlay.setAlpha(0);
      }
    }

    // Update crop sprites
    const existingCropIds = new Set(this.gameState.crops.map(c => c.id));

    // Remove sprites for crops that no longer exist
    for (const [id, sprite] of this.cropSprites) {
      if (!existingCropIds.has(id)) {
        sprite.destroy();
        this.cropSprites.delete(id);
      }
    }

    // Add/update crop sprites
    for (const crop of this.gameState.crops) {
      let sprite = this.cropSprites.get(crop.id);
      const frame = getCropFrame(crop.crop_type, crop.growth_stage);

      if (!sprite) {
        sprite = this.add.sprite(
          crop.x * TILE_SIZE + TILE_SIZE / 2,
          crop.y * TILE_SIZE + TILE_SIZE / 2,
          'farming-plants',
          frame,
        ).setDepth(10);
        this.cropSprites.set(crop.id, sprite);
      } else {
        sprite.setFrame(frame);
      }

      // Tint based on health
      if (crop.health < 0.3) {
        sprite.setTint(0xff6666); // Red tint for dying
      } else if (crop.health < 0.7) {
        sprite.setTint(0xffcc66); // Yellow tint for stressed
      } else {
        sprite.clearTint();
      }

      // Pulse effect for harvestable
      if (crop.growth_stage === 'harvestable') {
        const pulse = 0.9 + Math.sin(this.time.now / 300) * 0.1;
        sprite.setScale(pulse);
      } else {
        sprite.setScale(1);
      }
    }

    // Weather visuals
    const weather = this.gameState.weather;
    if (weather.condition === 'rainy') {
      if (!this.rainEmitter?.emitting) this.rainEmitter?.start();
      this.weatherTint?.setAlpha(0.15);
    } else if (weather.condition === 'cloudy') {
      this.rainEmitter?.stop();
      this.weatherTint?.setAlpha(0.08);
    } else {
      this.rainEmitter?.stop();
      this.weatherTint?.setAlpha(0);
    }
  }

  private emitStateUpdate(): void {
    eventBus.emit(EVENTS.STATE_UPDATED, { ...this.gameState });
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
