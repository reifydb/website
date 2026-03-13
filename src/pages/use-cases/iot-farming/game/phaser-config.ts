import Phaser from 'phaser';
import { FarmScene } from './farm-scene';
import { CANVAS_WIDTH, CANVAS_HEIGHT, DISPLAY_SCALE } from '../engine/constants';

export function createPhaserConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    pixelArt: true,
    zoom: DISPLAY_SCALE,
    backgroundColor: '#7ec850',
    scene: [FarmScene],
    physics: {
      default: 'arcade',
      arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    input: {
      mouse: { target: parent },
      touch: { target: parent },
    },
  };
}
