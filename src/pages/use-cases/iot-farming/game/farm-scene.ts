import Phaser from 'phaser';
import { preloadAssets, getCropFrame } from './asset-loader';
import { eventBus, EVENTS } from './event-bus';
import { generateWorldMap, getWorldTile, isGrassTile } from './world-map';
import { computeAutotile } from './autotile';
import {
  createInitialState,
  simulationTick,
  syncToDb,
  placeCrop,
  placeSensor,
  placeActuator,
  addRule,
  removeAt,
  harvestCrop,
} from '../engine/simulation';
import {
  GRID_WIDTH, GRID_HEIGHT, TILE_SIZE, BASE_TICK_MS, DISPLAY_SCALE,
  WORLD_WIDTH, WORLD_HEIGHT, FARM_OFFSET_X, FARM_OFFSET_Y,
} from '../engine/constants';
import type { GameState, ToolMode, CropType, SensorType, ActuatorType, Rule, WorldTile } from '../engine/types';
import type { WasmDB } from '@reifydb/wasm';

// Seeded LCG random
function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const CAMERA_SCROLL_SPEED = 2; // px per frame
const WATER_ANIM_INTERVAL = 250; // ms

export class FarmScene extends Phaser.Scene {
  private gameState!: GameState;
  private db: WasmDB | null = null;

  // World map
  private worldMap!: WorldTile[];

  // Water animation
  private waterTileSprites: Phaser.GameObjects.Image[] = [];
  private waterFrame = 0;
  private waterTimer = 0;

  // Farm sprites
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

  // Camera input
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };

  // Track last emitted camera position
  private lastCamX = -1;
  private lastCamY = -1;

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
    this.worldMap = generateWorldMap();

    const rng = createRng(12345);

    // --- Layer 0: Water tiles ---
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = getWorldTile(this.worldMap, x, y);
        if (tile === 'water') {
          const img = this.add.image(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            'water_0_0',
          ).setDepth(0);
          this.waterTileSprites.push(img);
        }
      }
    }

    // --- Layer 1: Grass autotiles ---
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = getWorldTile(this.worldMap, x, y);
        if (isGrassTile(tile)) {
          const result = computeAutotile(this.worldMap, x, y, rng);
          this.add.image(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            result.key,
          ).setDepth(1);

          // Inner corner overlays
          for (const cornerKey of result.innerCorners) {
            this.add.image(
              x * TILE_SIZE + TILE_SIZE / 2,
              y * TILE_SIZE + TILE_SIZE / 2,
              cornerKey,
            ).setDepth(1);
          }
        }
      }
    }

    // --- Layer 2: Farm interior grass (existing variants) ---
    const grassVariants = [
      'grass-mid', 'grass-mid', 'grass-mid', 'grass-mid',
      'grass-flowers1', 'grass-flowers2', 'grass-detail1', 'grass-detail2',
    ];
    const farmGrassRng = createRng(42);
    for (let fy = 0; fy < GRID_HEIGHT; fy++) {
      for (let fx = 0; fx < GRID_WIDTH; fx++) {
        const variant = grassVariants[Math.floor(farmGrassRng() * grassVariants.length)];
        this.add.image(
          (fx + FARM_OFFSET_X) * TILE_SIZE + TILE_SIZE / 2,
          (fy + FARM_OFFSET_Y) * TILE_SIZE + TILE_SIZE / 2,
          variant,
        ).setDepth(2);
      }
    }

    // --- Layer 3 & 4 & 15: Decorations, bushes, trees on non-farm grass ---
    const decoRng = createRng(777);
    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const tile = getWorldTile(this.worldMap, x, y);
        if (!isGrassTile(tile)) continue;

        // Skip farm area + 2-tile buffer
        if (
          x >= FARM_OFFSET_X - 2 && x < FARM_OFFSET_X + GRID_WIDTH + 2 &&
          y >= FARM_OFFSET_Y - 2 && y < FARM_OFFSET_Y + GRID_HEIGHT + 2
        ) continue;

        const roll = decoRng();
        if (roll < 0.04) {
          // Tree (2x2) — check space
          const canPlace =
            x + 1 < WORLD_WIDTH && y + 1 < WORLD_HEIGHT &&
            isGrassTile(getWorldTile(this.worldMap, x + 1, y)) &&
            isGrassTile(getWorldTile(this.worldMap, x, y + 1)) &&
            isGrassTile(getWorldTile(this.worldMap, x + 1, y + 1));

          if (canPlace) {
            // Pick tree variant (0 or 1)
            const tv = decoRng() < 0.5 ? 0 : 4;
            // Top row (canopy) at depth 15
            this.add.image(
              x * TILE_SIZE + TILE_SIZE / 2,
              y * TILE_SIZE + TILE_SIZE / 2,
              `trees_0_${tv}`,
            ).setDepth(15);
            this.add.image(
              (x + 1) * TILE_SIZE + TILE_SIZE / 2,
              y * TILE_SIZE + TILE_SIZE / 2,
              `trees_0_${tv + 1}`,
            ).setDepth(15);
            // Bottom row (trunk) at depth 4
            this.add.image(
              x * TILE_SIZE + TILE_SIZE / 2,
              (y + 1) * TILE_SIZE + TILE_SIZE / 2,
              `trees_1_${tv}`,
            ).setDepth(4);
            this.add.image(
              (x + 1) * TILE_SIZE + TILE_SIZE / 2,
              (y + 1) * TILE_SIZE + TILE_SIZE / 2,
              `trees_1_${tv + 1}`,
            ).setDepth(4);
          }
        } else if (roll < 0.08) {
          // Bush
          const bushIdx = Math.floor(decoRng() * 4);
          this.add.image(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            `bush_0_${bushIdx}`,
          ).setDepth(3);
        } else if (roll < 0.11) {
          // Small decoration
          const decoIdx = Math.floor(decoRng() * 5);
          this.add.image(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            `decorations_0_${decoIdx}`,
          ).setDepth(3);
        }
      }
    }

    // --- Layer 5: Fence around farm perimeter ---
    this.placeFarmFence();

    // --- Soil type overlays (depth 8) ---
    for (const tile of this.gameState.tiles) {
      if (tile.soil_type !== 'normal') {
        const color = tile.soil_type === 'sandy' ? 0xdec98a : 0x8b6914;
        const rect = this.add.rectangle(
          (tile.x + FARM_OFFSET_X) * TILE_SIZE + TILE_SIZE / 2,
          (tile.y + FARM_OFFSET_Y) * TILE_SIZE + TILE_SIZE / 2,
          TILE_SIZE, TILE_SIZE,
          color, 0.15,
        );
        rect.setDepth(8);
        this.soilOverlays.set(`${tile.x},${tile.y}`, rect);
      }
    }

    // --- Weather overlay (viewport-fixed, depth 100) ---
    const sw = this.scale.width;
    const sh = this.scale.height;
    this.weatherTint = this.add.rectangle(
      sw / 2,
      sh / 2,
      sw,
      sh,
      0x000000, 0,
    ).setDepth(100).setScrollFactor(0);

    // --- Rain particles (viewport-fixed, depth 101) ---
    this.rainEmitter = this.add.particles(0, 0, 'water-tiles', {
      frame: [0, 1, 2, 3],
      x: { min: 0, max: sw },
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
    this.rainEmitter.setScrollFactor(0);
    this.rainEmitter.stop();

    // --- Hover highlight (depth 90) ---
    this.hoverRect = this.add.rectangle(0, 0, TILE_SIZE, TILE_SIZE, 0xffffff, 0.2)
      .setDepth(90)
      .setVisible(false);

    // --- Selection highlight (depth 91) ---
    this.selectionRect = this.add.rectangle(0, 0, TILE_SIZE, TILE_SIZE)
      .setStrokeStyle(1, 0x14b8a6, 1)
      .setFillStyle(0x14b8a6, 0.15)
      .setDepth(91)
      .setVisible(false);

    // --- Camera setup ---
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH * TILE_SIZE, WORLD_HEIGHT * TILE_SIZE);
    this.cameras.main.centerOn(
      (FARM_OFFSET_X + GRID_WIDTH / 2) * TILE_SIZE,
      (FARM_OFFSET_Y + GRID_HEIGHT / 2) * TILE_SIZE,
    );
    this.cameras.main.setZoom(DISPLAY_SCALE);

    // --- Handle dynamic resize ---
    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
      this.cameras.main.setSize(gameSize.width, gameSize.height);

      if (this.weatherTint) {
        this.weatherTint.setPosition(gameSize.width / 2, gameSize.height / 2);
        this.weatherTint.setSize(gameSize.width, gameSize.height);
      }

      if (this.rainEmitter) {
        this.rainEmitter.updateConfig({ x: { min: 0, max: gameSize.width } });
      }
    });

    // --- Keyboard input for camera scrolling ---
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasdKeys = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // --- Input handling (farm-local coords) ---
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const worldTileX = Math.floor(pointer.worldX / TILE_SIZE);
      const worldTileY = Math.floor(pointer.worldY / TILE_SIZE);
      const farmX = worldTileX - FARM_OFFSET_X;
      const farmY = worldTileY - FARM_OFFSET_Y;

      if (farmX >= 0 && farmX < GRID_WIDTH && farmY >= 0 && farmY < GRID_HEIGHT) {
        this.hoverRect?.setPosition(
          worldTileX * TILE_SIZE + TILE_SIZE / 2,
          worldTileY * TILE_SIZE + TILE_SIZE / 2,
        );
        this.hoverRect?.setVisible(true);
      } else {
        this.hoverRect?.setVisible(false);
      }
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldTileX = Math.floor(pointer.worldX / TILE_SIZE);
      const worldTileY = Math.floor(pointer.worldY / TILE_SIZE);
      const farmX = worldTileX - FARM_OFFSET_X;
      const farmY = worldTileY - FARM_OFFSET_Y;

      if (farmX < 0 || farmX >= GRID_WIDTH || farmY < 0 || farmY >= GRID_HEIGHT) return;
      this.handleTileClick(farmX, farmY);
    });

    // --- Listen for React events ---
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
    // --- Camera scrolling ---
    const cam = this.cameras.main;
    if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
      cam.scrollX -= CAMERA_SCROLL_SPEED;
    }
    if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
      cam.scrollX += CAMERA_SCROLL_SPEED;
    }
    if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
      cam.scrollY -= CAMERA_SCROLL_SPEED;
    }
    if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
      cam.scrollY += CAMERA_SCROLL_SPEED;
    }

    // Emit camera position if changed
    const camX = Math.round(cam.scrollX);
    const camY = Math.round(cam.scrollY);
    if (camX !== this.lastCamX || camY !== this.lastCamY) {
      this.lastCamX = camX;
      this.lastCamY = camY;
      eventBus.emit(EVENTS.CAMERA_MOVED, { scrollX: camX, scrollY: camY });
    }

    // --- Water animation ---
    this.waterTimer += delta;
    if (this.waterTimer >= WATER_ANIM_INTERVAL) {
      this.waterTimer -= WATER_ANIM_INTERVAL;
      this.waterFrame = (this.waterFrame + 1) % 4;
      const texKey = `water_0_${this.waterFrame}`;
      for (const sprite of this.waterTileSprites) {
        sprite.setTexture(texKey);
      }
    }

    // --- Simulation ticks ---
    if (this.gameState.speed > 0) {
      const tickInterval = BASE_TICK_MS / this.gameState.speed;
      this.tickAccumulator += delta;

      while (this.tickAccumulator >= tickInterval) {
        this.tickAccumulator -= tickInterval;
        simulationTick(this.gameState);

        this.syncCounter++;
        if (this.syncCounter >= 5 && this.db) {
          syncToDb(this.gameState, this.db);
          this.syncCounter = 0;
        }
      }

      this.updateVisuals();
      this.emitStateUpdate();
    }
  }

  private handleTileClick(x: number, y: number): void {
    const mode = this.gameState.toolMode;

    if (mode === 'select') {
      this.gameState.selectedTile = { x, y };
      this.selectionRect?.setPosition(
        (x + FARM_OFFSET_X) * TILE_SIZE + TILE_SIZE / 2,
        (y + FARM_OFFSET_Y) * TILE_SIZE + TILE_SIZE / 2,
      );
      this.selectionRect?.setVisible(true);
      eventBus.emit(EVENTS.TILE_CLICKED, { x, y });
      this.emitStateUpdate();
      return;
    }

    if (mode === 'harvest') {
      if (harvestCrop(this.gameState, x, y)) {
        eventBus.emit(EVENTS.CROP_HARVESTED, { x, y });
      }
      this.emitStateUpdate();
      return;
    }

    if (mode === 'remove') {
      removeAt(this.gameState, x, y);
      this.emitStateUpdate();
      return;
    }

    if (mode.startsWith('plant_')) {
      const cropType = mode.replace('plant_', '') as CropType;
      placeCrop(this.gameState, cropType, x, y);
      this.emitStateUpdate();
      return;
    }

    if (mode.startsWith('place_') && mode.endsWith('_sensor')) {
      const sensorType = mode.replace('place_', '').replace('_sensor', '') as SensorType;
      placeSensor(this.gameState, sensorType, x, y);
      this.emitStateUpdate();
      return;
    }

    if (mode === 'place_sprinkler' || mode === 'place_heater' || mode === 'place_lamp') {
      const actuatorType = mode.replace('place_', '') as ActuatorType;
      placeActuator(this.gameState, actuatorType, x, y);
      this.emitStateUpdate();
      return;
    }
  }

  private updateVisuals(): void {
    // Moisture overlay on tiles
    for (const tile of this.gameState.tiles) {
      const key = `moisture_${tile.x},${tile.y}`;
      let overlay = this.soilOverlays.get(key);

      if (tile.moisture > 0.6) {
        const worldX = (tile.x + FARM_OFFSET_X) * TILE_SIZE + TILE_SIZE / 2;
        const worldY = (tile.y + FARM_OFFSET_Y) * TILE_SIZE + TILE_SIZE / 2;
        if (!overlay) {
          overlay = this.add.rectangle(
            worldX, worldY,
            TILE_SIZE, TILE_SIZE,
            0x4488cc, (tile.moisture - 0.6) * 0.5,
          ).setDepth(8);
          this.soilOverlays.set(key, overlay);
        } else {
          overlay.setAlpha((tile.moisture - 0.6) * 0.5);
        }
      } else if (overlay) {
        overlay.setAlpha(0);
      }
    }

    // Crop sprites
    const existingCropIds = new Set(this.gameState.crops.map(c => c.id));

    for (const [id, sprite] of this.cropSprites) {
      if (!existingCropIds.has(id)) {
        sprite.destroy();
        this.cropSprites.delete(id);
      }
    }

    for (const crop of this.gameState.crops) {
      let sprite = this.cropSprites.get(crop.id);
      const frame = getCropFrame(crop.crop_type, crop.growth_stage);
      const worldX = (crop.x + FARM_OFFSET_X) * TILE_SIZE + TILE_SIZE / 2;
      const worldY = (crop.y + FARM_OFFSET_Y) * TILE_SIZE + TILE_SIZE / 2;

      if (!sprite) {
        sprite = this.add.sprite(worldX, worldY, 'farming-plants', frame).setDepth(10);
        this.cropSprites.set(crop.id, sprite);
      } else {
        sprite.setFrame(frame);
      }

      if (crop.health < 0.3) {
        sprite.setTint(0xff6666);
      } else if (crop.health < 0.7) {
        sprite.setTint(0xffcc66);
      } else {
        sprite.clearTint();
      }

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

  private placeFarmFence(): void {
    // Fence around farm perimeter (1 tile outside the 16x12 grid)
    const left = FARM_OFFSET_X - 1;
    const right = FARM_OFFSET_X + GRID_WIDTH;
    const top = FARM_OFFSET_Y - 1;
    const bottom = FARM_OFFSET_Y + GRID_HEIGHT;

    for (let x = left; x <= right; x++) {
      for (let y = top; y <= bottom; y++) {
        // Only place on the border
        if (x > left && x < right && y > top && y < bottom) continue;

        let fenceKey: string;
        if (x === left && y === top) fenceKey = 'fences_0_0';        // TL corner
        else if (x === right && y === top) fenceKey = 'fences_0_2';  // TR corner
        else if (x === left && y === bottom) fenceKey = 'fences_2_0'; // BL corner
        else if (x === right && y === bottom) fenceKey = 'fences_2_2'; // BR corner
        else if (y === top) fenceKey = 'fences_0_1';                  // top edge
        else if (y === bottom) fenceKey = 'fences_2_1';              // bottom edge
        else if (x === left) fenceKey = 'fences_1_0';                // left edge
        else fenceKey = 'fences_1_2';                                // right edge

        this.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          fenceKey,
        ).setDepth(5);
      }
    }
  }

  private emitStateUpdate(): void {
    eventBus.emit(EVENTS.STATE_UPDATED, { ...this.gameState });
  }

  getGameState(): GameState {
    return this.gameState;
  }
}
