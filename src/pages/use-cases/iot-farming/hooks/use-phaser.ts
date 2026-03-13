import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { createPhaserConfig } from '../game/phaser-config';
import { FarmScene } from '../game/farm-scene';
import type { WasmDB } from '@reifydb/wasm';

export function usePhaser(
  containerRef: React.RefObject<HTMLDivElement | null>,
  db: WasmDB | null,
) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || !db) return;

    const config = createPhaserConfig(containerRef.current);
    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Pass DB to scene once it's ready
    game.events.on('ready', () => {
      const scene = game.scene.getScene('FarmScene') as FarmScene;
      if (scene) {
        scene.setDB(db);
      }
    });

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [containerRef, db]);

  return gameRef;
}
