"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function NKCellGame() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const direction = new THREE.Vector3();
    const speed = 0.1;

    // Handle key events
    const keysPressed: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("KeyDown event:", e.key, e.code);
      keysPressed[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      console.log("KeyUp event:", e.key, e.code);
      keysPressed[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Set color and fog for the scene
    scene.background = new THREE.Color(0x331a1a); // dark reddish for tissue vibes
    scene.fog = new THREE.Fog(0x331a1a, 5, 20); // near, far distances for fog

    // Add some blobs
    const tissueMaterial = new THREE.MeshStandardMaterial({
      color: 0xaa6666,
      roughness: 1,
      metalness: 0,
      opacity: 0.3,
      transparent: true,
    });

    for (let i = 0; i < 100; i++) {
      const blob = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        tissueMaterial
      );
      blob.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      scene.add(blob);
    }

    // Create a tunnel-like structure
    const tunnelGeometry = new THREE.CylinderGeometry(15, 15, 50, 32, 1, true);
    const tunnelMaterial = new THREE.MeshStandardMaterial({
      color: 0x551111,
      side: THREE.BackSide,
      transparent: false,
      opacity: 1, // <- Fully visible
      roughness: 1,
      metalness: 0,
    });
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnel.rotation.x = Math.PI / 2;
    scene.add(tunnel);

    // NK Cell (Sphere)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x90ff1e });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Ambient light for general brightness
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional light for strong shading & highlights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10); // position it above and at an angle
    scene.add(directionalLight);

    // Optional: helper to visualize light direction
    const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
    scene.add(lightHelper);

    // 🧪 Grid helper (add it here!)
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Camera position
    camera.position.z = 5;
    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;

      direction.set(0, 0, 0);
      if (keysPressed["w"]) direction.z -= 1;
      if (keysPressed["s"]) direction.z += 1;
      if (keysPressed["a"]) direction.x -= 1;
      if (keysPressed["d"]) direction.x += 1;

      direction.normalize().multiplyScalar(speed);
      sphere.position.add(direction);

      // 3rd person chase camera
      const cameraOffset = new THREE.Vector3(0, 3, 6); // camera stays behind & above
      const desiredCameraPos = sphere.position.clone().add(cameraOffset);

      // Smooth follow
      camera.position.lerp(desiredCameraPos, 0.1); // adjust 0.1 for trailing smoothness
      camera.lookAt(sphere.position);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <main className="p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Immune Crusade</h1>
        <p className="text-lg text-gray-700">
          OH NO! Your body is under siege! A stealthy virus has breached your
          defenses, and you've been transformed into a natural killer cell (NK
          Cell). Your mission: track down and annihilate infected cells to
          prevent the virus from spreading. The fate of your body rests in your
          hands—defend it at all costs!
        </p>
      </header>
      <div ref={mountRef} className="w-full h-[500px] border" />
    </main>
  );
}
