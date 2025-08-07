"use client";

import { useEffect, useRef, useState } from "react";
import { initGame } from "./game/gameLogic";

export default function NKCellGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<
    "menu" | "playing" | "paused" | "won"
  >("menu");
  const gameStateRef = useRef(gameState);
  const initializedRef = useRef(false);
  const animationRef = useRef(0);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || initializedRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width && entry.contentRect.height) {
          observer.disconnect();
          initializeGame();
        }
      }
    });

    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  const initializeGame = () => {
    initializedRef.current = true;
    const mount = mountRef.current!;
    
    const cleanup = initGame(mount, {
      gameStateRef,
      setGameState,
      animationRef,
    });

    return cleanup;
  };

  return (
    <main className="p-4">
      <div className="relative w-full h-[calc(100vh-95px)] select-none">
        {(gameState === "menu" || gameState === "paused") && (
          <div className="absolute inset-0 bg-red-800 bg-opacity-70 z-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Immune Crusade
            </h1>
            <p className="text-white text-lg mb-4 max-w-xl text-center px-4">
              OH NO! Your body is under siege! A stealthy virus has breached
              your defenses, and you've been transformed into a natural killer
              cell. Track down and annihilate infected cells before they can
              spread!
            </p>
            <p className="text-white text-lg mb-4">
              CONTROLS: WASD to move, move mouse to look, ESC to pause
            </p>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
              onClick={() => {
                setGameState("playing");
                mountRef.current?.requestPointerLock();
              }}
            >
              {gameState === "menu" ? "Play" : "Resume"}
            </button>
          </div>
        )}

        {gameState === "won" && (
          <div className="absolute inset-0 bg-red-800 bg-opacity-80 z-50 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-white mb-4">🎉 You Won!</h2>
            <p className="text-white text-lg mb-6">
              All infected cells eliminated.
            </p>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        )}

        <div ref={mountRef} className="w-full h-full relative" />
      </div>
    </main>
  );
}