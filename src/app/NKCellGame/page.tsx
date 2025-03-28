"use client";

import { useEffect, useRef } from "react";

export default function NKCellGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 20,
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <main className="p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Immune Crusade</h1>
        <p className="text-lg text-gray-700">
          OH NO! Your body is under siege! A stealthy virus has breached your
          defenses, and you've been transformed into a natural killer cell (NK
          Cell). Your mission: track down and annihilate every infected cell
          before they can spread. The fate of your body rests in your
          hands—defend it at all costs!
        </p>
      </header>
      <div className="flex justify-center items-center">
        <canvas ref={canvasRef} width={600} height={400} className="border" />
      </div>
    </main>
  );
}
