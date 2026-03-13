import Phaser from 'phaser';
import { FarmScene } from './farm-scene';

export function createPhaserConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    pixelArt: true,
    backgroundColor: '#3a6ab0',
    scene: [FarmScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoRound: true,
    },
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
