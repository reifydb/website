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

    // Pass DB to scene.
    // In some browsers, base64 textures load synchronously during boot,
    // causing the 'ready' event to fire inside the Game constructor
    // (before we can register a listener). Try both approaches:
    const trySetDB = () => {
      const scene = game.scene.getScene('FarmScene') as FarmScene;
      if (scene) {
        scene.setDB(db);
        return true;
      }
      return false;
    };

    // Immediate attempt (scene instance exists after boot)
    if (!trySetDB()) {
      // Fallback: wait for ready event (deferred boot)
      game.events.once('ready', trySetDB);
    }

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [containerRef, db]);

  return gameRef;
}
