const TAU = Math.PI * 2;

// Palette colors as [r, g, b]
const IDLE_COLOR: RGB = [51, 51, 51]; // #333333 (--color-bg-elevated)
const PRIMARY: RGB = [129, 140, 248]; // #818cf8 (--color-primary)
const PRIMARY_LIGHT: RGB = [165, 180, 252]; // #a5b4fc (--color-primary-light)
const GLOW_CYAN: RGB = [34, 211, 238]; // #22d3ee (--color-accent-cyan)
const GLOW_LIME: RGB = [196, 240, 66]; // #c4f042 (--color-feature-green)
const GLOW_COLORS: RGB[] = [GLOW_CYAN, GLOW_LIME, PRIMARY, PRIMARY_LIGHT];

type RGB = [number, number, number];

interface GridPoint {
  col: number;
  row: number;
}

type PulseType = 'line' | 'radial' | 'branch' | 'cross';

interface Pulse {
  type: PulseType;
  path: GridPoint[];
  activated: Set<string>;
  progress: number;
  speed: number;
  glowColor: RGB;
  spread: number;
  /** Depth of cascade — prevents infinite chain reactions */
  depth: number;
  /** For radial pulses: center point and current radius */
  center?: GridPoint;
  maxRadius?: number;
}

/** Faint connection line between recently activated dots */
interface ConnectionLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number; // 0..1, decays to 0
  color: RGB;
}

export interface DotGridConfig {
  spacing?: number;
  dotRadius?: number;
  maxPulses?: number;
  pulseIntervalMin?: number;
  pulseIntervalMax?: number;
  fadeMargin?: number;
  reducedMotion?: boolean;
}

const defaults = {
  spacing: 32,
  dotRadius: 1.5,
  maxPulses: 6,
  pulseIntervalMin: 1200,
  pulseIntervalMax: 2800,
  fadeMargin: 80,
  reducedMotion: false,
};

type ResolvedConfig = typeof defaults;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export class DotGridRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cols = 0;
  private rows = 0;
  private width = 0;
  private height = 0;
  private offsetX = 0;
  private offsetY = 0;
  private dpr = 1;

  // Dot state — flat arrays indexed by row * cols + col
  private glowIntensity!: Float32Array;
  private glowColorR!: Float32Array;
  private glowColorG!: Float32Array;
  private glowColorB!: Float32Array;
  private decayDuration!: Float32Array;
  private decayTimers!: Float32Array;
  /** Dot radius scale: 1.0 = normal, >1.0 = enlarged during activation */
  private dotScale!: Float32Array;

  private pulses: Pulse[] = [];
  private pulseSpawnTimer = 0;
  private connectionLines: ConnectionLine[] = [];

  private animFrameId = 0;
  private lastTime = 0;
  private running = false;
  private isVisible = true;
  private config: ResolvedConfig;

  constructor(canvas: HTMLCanvasElement, config: DotGridConfig = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = { ...defaults, ...config };
    this.pulseSpawnTimer =
      randomRange(this.config.pulseIntervalMin, this.config.pulseIntervalMax) / 1000;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spacing = width < 768 ? 48 : this.config.spacing;

    this.cols = Math.floor(width / spacing) + 2;
    this.rows = Math.floor(height / spacing) + 2;

    this.offsetX = (width - (this.cols - 1) * spacing) / 2;
    this.offsetY = (height - (this.rows - 1) * spacing) / 2;

    (this as any)._spacing = spacing;

    const total = this.cols * this.rows;
    this.glowIntensity = new Float32Array(total);
    this.glowColorR = new Float32Array(total);
    this.glowColorG = new Float32Array(total);
    this.glowColorB = new Float32Array(total);
    this.decayDuration = new Float32Array(total);
    this.decayTimers = new Float32Array(total);
    this.dotScale = new Float32Array(total).fill(1.0);

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    if (this.config.reducedMotion) {
      this.renderStatic();
    } else if (!this.running) {
      this.start();
    }
  }

  private get spacing(): number {
    return (this as any)._spacing ?? this.config.spacing;
  }

  private start(): void {
    this.running = true;
    this.lastTime = performance.now();
    this.animFrameId = requestAnimationFrame(this.tick);
  }

  private tick = (timestamp: number): void => {
    if (!this.running) return;

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    if (this.isVisible) {
      this.updatePulses(dt);
      this.updateDecays(dt);
      this.updateConnections(dt);
      this.maybeSpawnPulse(dt);
      this.render();
    }

    this.animFrameId = requestAnimationFrame(this.tick);
  };

  // --- Pulse generation ---

  private createPulse(depth = 0, origin?: GridPoint, forceType?: PulseType): Pulse {
    const type = forceType ?? this.pickPulseType();
    const glowColor = pickRandom(GLOW_COLORS);
    const speed = randomRange(0.35, 0.65);

    if (type === 'radial') {
      const center = origin ?? {
        col: randomInt(4, this.cols - 5),
        row: randomInt(4, this.rows - 5),
      };
      const maxRadius = randomInt(3, 6);
      // Build path as concentric rings of dots
      const path: GridPoint[] = [];
      for (let radius = 0; radius <= maxRadius; radius++) {
        for (let dc = -radius; dc <= radius; dc++) {
          for (let dr = -radius; dr <= radius; dr++) {
            const dist = Math.sqrt(dc * dc + dr * dr);
            if (dist >= radius - 0.5 && dist < radius + 0.5) {
              const c = center.col + dc;
              const r = center.row + dr;
              if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
                path.push({ col: c, row: r });
              }
            }
          }
        }
      }
      return {
        type,
        path,
        activated: new Set(),
        progress: 0,
        speed: speed * 0.7, // radials are slower
        glowColor,
        spread: 0, // radials already cover area
        depth,
        center,
        maxRadius,
      };
    }

    if (type === 'cross') {
      const center = origin ?? {
        col: randomInt(6, this.cols - 7),
        row: randomInt(6, this.rows - 7),
      };
      const armLen = randomInt(4, 8);
      const path: GridPoint[] = [{ col: center.col, row: center.row }];
      // Four arms, interleaved so they grow outward simultaneously
      for (let i = 1; i <= armLen; i++) {
        path.push({ col: center.col + i, row: center.row }); // right
        path.push({ col: center.col - i, row: center.row }); // left
        path.push({ col: center.col, row: center.row + i }); // down
        path.push({ col: center.col, row: center.row - i }); // up
      }
      return {
        type,
        path,
        activated: new Set(),
        progress: 0,
        speed,
        glowColor,
        spread: 0,
        depth,
      };
    }

    if (type === 'branch') {
      return this.createBranchPulse(depth, origin, glowColor, speed);
    }

    // Default: line (horizontal, vertical, or L-shaped)
    const lineType = Math.random();
    let path: GridPoint[];
    if (lineType < 0.35) {
      path = this.generateHorizontalPath();
    } else if (lineType < 0.7) {
      path = this.generateVerticalPath();
    } else {
      path = this.generateLPath();
    }

    return {
      type: 'line',
      path,
      activated: new Set(),
      progress: 0,
      speed,
      glowColor,
      spread: 1,
      depth,
    };
  }

  private pickPulseType(): PulseType {
    const r = Math.random();
    if (r < 0.30) return 'line';
    if (r < 0.55) return 'radial';
    if (r < 0.75) return 'cross';
    return 'branch';
  }

  private createBranchPulse(
    depth: number,
    origin: GridPoint | undefined,
    glowColor: RGB,
    speed: number,
  ): Pulse {
    const start = origin ?? {
      col: randomInt(6, this.cols - 7),
      row: randomInt(6, this.rows - 7),
    };

    // Build a tree-like path: trunk + 2-3 branches
    const path: GridPoint[] = [];
    const trunkDir = Math.random() < 0.5 ? 'h' : 'v';
    const trunkLen = randomInt(5, 10);

    if (trunkDir === 'h') {
      const dir = Math.random() < 0.5 ? 1 : -1;
      for (let i = 0; i < trunkLen; i++) {
        path.push({ col: start.col + i * dir, row: start.row });
      }
      // Branches at random points along trunk
      const branchCount = randomInt(2, 3);
      for (let b = 0; b < branchCount; b++) {
        const branchAt = randomInt(2, trunkLen - 1);
        const branchDir = Math.random() < 0.5 ? 1 : -1;
        const branchLen = randomInt(2, 5);
        for (let i = 1; i <= branchLen; i++) {
          path.push({
            col: start.col + branchAt * dir,
            row: start.row + i * branchDir,
          });
        }
      }
    } else {
      const dir = Math.random() < 0.5 ? 1 : -1;
      for (let i = 0; i < trunkLen; i++) {
        path.push({ col: start.col, row: start.row + i * dir });
      }
      const branchCount = randomInt(2, 3);
      for (let b = 0; b < branchCount; b++) {
        const branchAt = randomInt(2, trunkLen - 1);
        const branchDir = Math.random() < 0.5 ? 1 : -1;
        const branchLen = randomInt(2, 5);
        for (let i = 1; i <= branchLen; i++) {
          path.push({
            col: start.col + i * branchDir,
            row: start.row + branchAt * dir,
          });
        }
      }
    }

    // Filter out-of-bounds
    const validPath = path.filter(
      (p) => p.col >= 0 && p.col < this.cols && p.row >= 0 && p.row < this.rows,
    );

    return {
      type: 'branch',
      path: validPath,
      activated: new Set(),
      progress: 0,
      speed: speed * 0.8,
      glowColor,
      spread: 1,
      depth,
    };
  }

  private generateHorizontalPath(): GridPoint[] {
    const row = randomInt(2, this.rows - 3);
    const len = randomInt(8, Math.min(20, this.cols - 4));
    const startCol = randomInt(2, this.cols - len - 2);
    const path: GridPoint[] = [];
    for (let i = 0; i < len; i++) {
      path.push({ col: startCol + i, row });
    }
    return path;
  }

  private generateVerticalPath(): GridPoint[] {
    const col = randomInt(2, this.cols - 3);
    const len = randomInt(6, Math.min(15, this.rows - 4));
    const startRow = randomInt(2, this.rows - len - 2);
    const path: GridPoint[] = [];
    for (let i = 0; i < len; i++) {
      path.push({ col, row: startRow + i });
    }
    return path;
  }

  private generateLPath(): GridPoint[] {
    const path: GridPoint[] = [];
    const row = randomInt(3, this.rows - 6);
    const hLen = randomInt(5, Math.min(12, this.cols - 6));
    const startCol = randomInt(2, this.cols - hLen - 4);
    for (let i = 0; i < hLen; i++) {
      path.push({ col: startCol + i, row });
    }
    const dir = Math.random() < 0.5 ? 1 : -1;
    const vLen = randomInt(4, Math.min(10, dir > 0 ? this.rows - row - 2 : row - 2));
    const lastCol = startCol + hLen - 1;
    for (let i = 1; i <= vLen; i++) {
      path.push({ col: lastCol, row: row + i * dir });
    }
    return path;
  }

  // --- Pulse simulation ---

  private activateDot(col: number, row: number, glowColor: RGB, intensity: number): void {
    if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) return;
    const idx = row * this.cols + col;

    if (this.glowIntensity[idx] >= intensity) return;

    this.glowIntensity[idx] = intensity;
    this.glowColorR[idx] = glowColor[0];
    this.glowColorG[idx] = glowColor[1];
    this.glowColorB[idx] = glowColor[2];

    const duration = randomRange(0.8, 1.8);
    this.decayDuration[idx] = duration;
    this.decayTimers[idx] = duration;

    // Scale up dot on activation — larger for higher intensity
    this.dotScale[idx] = 1.0 + intensity * 1.2;
  }

  private addConnection(col1: number, row1: number, col2: number, row2: number, color: RGB): void {
    const x1 = this.offsetX + col1 * this.spacing;
    const y1 = this.offsetY + row1 * this.spacing;
    const x2 = this.offsetX + col2 * this.spacing;
    const y2 = this.offsetY + row2 * this.spacing;
    this.connectionLines.push({ x1, y1, x2, y2, life: 1.0, color });
  }

  private updatePulses(dt: number): void {
    const newPulses: Pulse[] = [];

    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.progress += pulse.speed * dt;

      const headIdx = Math.floor(pulse.progress * pulse.path.length);

      let prevActivated: GridPoint | null = null;
      for (let j = 0; j <= Math.min(headIdx, pulse.path.length - 1); j++) {
        const pt = pulse.path[j];
        const key = `${pt.col},${pt.row}`;
        if (pulse.activated.has(key)) {
          prevActivated = pt;
          continue;
        }
        pulse.activated.add(key);

        this.activateDot(pt.col, pt.row, pulse.glowColor, 1.0);

        // Connection line to previous dot on path
        if (prevActivated) {
          this.addConnection(
            prevActivated.col,
            prevActivated.row,
            pt.col,
            pt.row,
            pulse.glowColor,
          );
        }
        prevActivated = pt;

        // Neighbor spread
        if (pulse.spread > 0) {
          for (let dc = -pulse.spread; dc <= pulse.spread; dc++) {
            for (let dr = -pulse.spread; dr <= pulse.spread; dr++) {
              if (dc === 0 && dr === 0) continue;
              const dist = Math.abs(dc) + Math.abs(dr);
              const ni = dist === 1 ? 0.45 : 0.2;
              this.activateDot(pt.col + dc, pt.row + dr, pulse.glowColor, ni);
            }
          }
        }
      }

      // When pulse finishes, maybe cascade a secondary pulse from the endpoint
      if (pulse.progress >= 1.0) {
        if (pulse.depth < 2 && Math.random() < 0.4) {
          const lastPt = pulse.path[pulse.path.length - 1];
          const cascadeType = pickRandom<PulseType>(['radial', 'cross', 'branch']);
          newPulses.push(this.createPulse(pulse.depth + 1, lastPt, cascadeType));
        }
        this.pulses.splice(i, 1);
      }
    }

    // Add cascaded pulses (respect max)
    for (const p of newPulses) {
      if (this.pulses.length < this.config.maxPulses + 2) {
        this.pulses.push(p);
      }
    }
  }

  private updateDecays(dt: number): void {
    for (let i = 0; i < this.decayTimers.length; i++) {
      if (this.decayTimers[i] > 0) {
        this.decayTimers[i] = Math.max(0, this.decayTimers[i] - dt);
        this.glowIntensity[i] = this.decayTimers[i] / this.decayDuration[i];
        // Dot scale shrinks back to 1.0 as glow fades
        this.dotScale[i] = 1.0 + this.glowIntensity[i] * 1.2;
      } else if (this.dotScale[i] > 1.0) {
        this.dotScale[i] = 1.0;
      }
    }
  }

  private updateConnections(dt: number): void {
    for (let i = this.connectionLines.length - 1; i >= 0; i--) {
      this.connectionLines[i].life -= dt * 0.8; // fade over ~1.2s
      if (this.connectionLines[i].life <= 0) {
        this.connectionLines.splice(i, 1);
      }
    }
  }

  private maybeSpawnPulse(dt: number): void {
    this.pulseSpawnTimer -= dt;
    if (this.pulseSpawnTimer <= 0 && this.pulses.length < this.config.maxPulses) {
      this.pulses.push(this.createPulse());
      this.pulseSpawnTimer =
        randomRange(this.config.pulseIntervalMin, this.config.pulseIntervalMax) / 1000;
    }
  }

  // --- Rendering ---

  private edgeFade(x: number, y: number): number {
    const m = this.config.fadeMargin;
    return Math.min(
      smoothstep(0, m, x),
      smoothstep(0, m, this.width - x),
      smoothstep(0, m, y),
      smoothstep(0, m, this.height - y),
    );
  }

  private render(): void {
    const ctx = this.ctx;
    const spacing = this.spacing;
    const baseR = this.config.dotRadius;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(this.dpr, this.dpr);

    // --- Connection lines (behind dots) ---
    for (const line of this.connectionLines) {
      const alpha = easeOutQuad(line.life) * 0.15;
      if (alpha < 0.005) continue;
      const fade = Math.min(
        this.edgeFade(line.x1, line.y1),
        this.edgeFade(line.x2, line.y2),
      );
      if (fade <= 0) continue;
      ctx.strokeStyle = `rgba(${line.color[0]},${line.color[1]},${line.color[2]},${(alpha * fade).toFixed(3)})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    }

    // --- Dots ---
    // Phase 1: Batch idle dots
    ctx.fillStyle = 'rgba(51,51,51,0.6)';
    ctx.beginPath();

    const specialDots: {
      x: number;
      y: number;
      radius: number;
      r: number;
      g: number;
      b: number;
      a: number;
    }[] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = this.offsetX + col * spacing;
        const y = this.offsetY + row * spacing;
        const fade = this.edgeFade(x, y);
        if (fade <= 0) continue;

        const idx = row * this.cols + col;
        const glow = this.glowIntensity[idx];
        const scale = this.dotScale[idx];

        const isSpecial = glow > 0.01 || scale > 1.01;

        if (!isSpecial) {
          const a = 0.6 * fade;
          if (a > 0.01) {
            ctx.moveTo(x + baseR, y);
            ctx.arc(x, y, baseR, 0, TAU);
          }
        } else {
          let color: RGB = IDLE_COLOR;
          let alpha = 0.6;
          let dotRadius = baseR * scale;

          // Glow
          if (glow > 0.01) {
            const glowC: RGB = [
              this.glowColorR[idx],
              this.glowColorG[idx],
              this.glowColorB[idx],
            ];
            const t = easeOutCubic(glow);
            color = lerpRGB(IDLE_COLOR, glowC, t);
            alpha = lerp(0.6, 1.0, t);
          }

          alpha *= fade;
          if (alpha > 0.01) {
            specialDots.push({
              x,
              y,
              radius: dotRadius,
              r: color[0],
              g: color[1],
              b: color[2],
              a: alpha,
            });
          }
        }
      }
    }

    ctx.fill(); // batch idle

    for (const dot of specialDots) {
      ctx.fillStyle = `rgba(${dot.r | 0},${dot.g | 0},${dot.b | 0},${dot.a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
  }

  private renderStatic(): void {
    const ctx = this.ctx;
    const spacing = this.spacing;
    const r = this.config.dotRadius;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.scale(this.dpr, this.dpr);

    ctx.fillStyle = 'rgba(51,51,51,0.6)';
    ctx.beginPath();

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x = this.offsetX + col * spacing;
        const y = this.offsetY + row * spacing;
        const fade = this.edgeFade(x, y);
        if (fade <= 0) continue;

        if (fade < 0.99) {
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = `rgba(51,51,51,${(0.6 * fade).toFixed(3)})`;
          ctx.arc(x, y, r, 0, TAU);
          ctx.fill();
          ctx.fillStyle = 'rgba(51,51,51,0.6)';
          ctx.beginPath();
        } else {
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, TAU);
        }
      }
    }

    ctx.fill();
    ctx.restore();
  }

  // --- External API ---

  setVisible(visible: boolean): void {
    this.isVisible = visible;
  }

  setReducedMotion(reduced: boolean): void {
    this.config.reducedMotion = reduced;
    if (reduced) {
      this.running = false;
      cancelAnimationFrame(this.animFrameId);
      this.pulses = [];
      this.connectionLines = [];
      this.renderStatic();
    } else if (!this.running) {
      this.start();
    }
  }

  destroy(): void {
    this.running = false;
    cancelAnimationFrame(this.animFrameId);
  }
}
