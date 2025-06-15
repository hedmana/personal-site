"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

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
          initGame();
        }
      }
    });

    observer.observe(mount);
    return () => observer.disconnect();
  }, []);

  const initGame = () => {
    initializedRef.current = true;
    const mount = mountRef.current!;
    const MAX_ENEMIES = 10;
    const MIN_SPAWN_DISTANCE = 10;
    let enemiesEliminated = 0;
    let totalEnemiesSpawned = 0;
    const speed = 0.1;
    const enemySpeed = 0.02;
    const spawnRadius = 15;
    const maxRadius = 29;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x331a1a);
    scene.fog = new THREE.Fog(0x331a1a, 5, 20);

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const blobMat = new THREE.MeshStandardMaterial({
      color: 0xaa6666,
      transparent: true,
      opacity: 0.3,
      roughness: 1,
    });

    for (let i = 0; i < 100; i++) {
      const blob = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        blobMat
      );
      blob.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      scene.add(blob);
    }

    const environment = new THREE.Mesh(
      new THREE.SphereGeometry(30, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x551111,
        side: THREE.BackSide,
        roughness: 1,
      })
    );
    scene.add(environment);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x90ff1e })
    );
    scene.add(sphere);

    const counter = document.createElement("div");
    Object.assign(counter.style, {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "white",
      background: "rgba(0,0,0,0.5)",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      zIndex: "10",
      userSelect: "none",
    });
    counter.innerText = `Infected Cells Remaining: ${MAX_ENEMIES} / ${MAX_ENEMIES}`;
    mount.appendChild(counter);

    const enemies: THREE.Mesh[] = [];

    const spawnEnemy = () => {
      if (totalEnemiesSpawned >= MAX_ENEMIES) return;

      const enemy = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
      );

      let x: number, z: number;
      do {
        const angle = Math.random() * Math.PI * 2;
        const r = spawnRadius * Math.sqrt(Math.random());
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r;
      } while (Math.hypot(x, z) < MIN_SPAWN_DISTANCE);

      enemy.position.set(x, sphere.position.y, z);

      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        0,
        Math.random() - 0.5
      ).normalize();
      (enemy.userData as any).velocity = dir.multiplyScalar(enemySpeed);

      scene.add(enemy);
      enemies.push(enemy);
      totalEnemiesSpawned++;
      counter.innerText = `Infected Cells Remaining: ${
        MAX_ENEMIES - enemiesEliminated
      } / ${MAX_ENEMIES}`;
    };

    let yaw = 0;
    const keysPressed: Record<string, boolean> = {};
    window.addEventListener("keydown", (e) => {
      keysPressed[e.key.toLowerCase()] = true;
    });
    window.addEventListener("keyup", (e) => {
      keysPressed[e.key.toLowerCase()] = false;
    });
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== mount) return;
      yaw -= e.movementX * 0.001;
    };
    document.addEventListener("mousemove", onMouseMove);
    const handlePointerLockChange = () => {
      if (
        document.pointerLockElement !== mount &&
        gameStateRef.current === "playing"
      ) {
        setGameState("paused");
      }
    };
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    const updateCamera = () => {
      const radius = 6;
      const height = 2.5;
      camera.position.set(
        sphere.position.x + radius * Math.sin(yaw),
        sphere.position.y + height,
        sphere.position.z + radius * Math.cos(yaw)
      );
      camera.lookAt(sphere.position);
    };

    updateCamera();
    renderer.render(scene, camera);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (gameStateRef.current === "playing") {
        if (totalEnemiesSpawned === 0) {
          for (let i = 0; i < MAX_ENEMIES; i++) {
            spawnEnemy();
          }
        }

        const dir = new THREE.Vector3();
        if (keysPressed["w"]) dir.z -= 1;
        if (keysPressed["s"]) dir.z += 1;
        if (keysPressed["a"]) dir.x -= 1;
        if (keysPressed["d"]) dir.x += 1;
        if (dir.lengthSq() > 0) {
          dir.normalize();
          const sin = -Math.sin(yaw),
            cos = Math.cos(yaw);
          sphere.position.x += (dir.x * cos - dir.z * sin) * speed;
          sphere.position.z += (dir.x * sin + dir.z * cos) * speed;
        }

        const pxzLen = Math.hypot(sphere.position.x, sphere.position.z);
        if (pxzLen > maxRadius) {
          sphere.position.x *= maxRadius / pxzLen;
          sphere.position.z *= maxRadius / pxzLen;
        }

        for (let i = enemies.length - 1; i >= 0; i--) {
          const enemy = enemies[i];
          const vel = (enemy.userData as any).velocity as THREE.Vector3;

          enemy.position.add(vel);
          enemy.position.y = sphere.position.y;

          const exzLen = Math.hypot(enemy.position.x, enemy.position.z);
          if (exzLen > maxRadius) {
            const normal = new THREE.Vector3(
              enemy.position.x / exzLen,
              0,
              enemy.position.z / exzLen
            );
            vel.reflect(normal);
            enemy.position.x = normal.x * maxRadius;
            enemy.position.z = normal.z * maxRadius;
          }

          if (sphere.position.distanceTo(enemy.position) < 1.2) {
            scene.remove(enemy);
            enemies.splice(i, 1);
            enemiesEliminated++;
            counter.innerText = `Enemies Remaining: ${
              MAX_ENEMIES - enemiesEliminated
            } / ${MAX_ENEMIES}`;
            if (enemiesEliminated === MAX_ENEMIES) {
              gameStateRef.current = "won";
              setGameState("won");
              document.exitPointerLock();
            }
          }
        }
      }

      updateCamera();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      mount.removeChild(renderer.domElement);
      mount.removeChild(counter);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
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
