import * as THREE from "three";

// Game configuration settings
export interface GameConfig {
  MAX_ENEMIES: number;
  MIN_SPAWN_DISTANCE: number;
  speed: number;
  enemySpeed: number;
  spawnRadius: number;
  maxRadius: number;
}

// React state references
export interface GameRefs {
  gameStateRef: React.MutableRefObject<string>;
  setGameState: (state: "menu" | "playing" | "paused" | "won") => void;
  animationRef: React.MutableRefObject<number>;
}

// Initialize the 3D game
export function initGame(mount: HTMLDivElement, refs: GameRefs) {
  // Game settings
  const config: GameConfig = {
    MAX_ENEMIES: 10,
    MIN_SPAWN_DISTANCE: 10,
    speed: 0.1,
    enemySpeed: 0.02,
    spawnRadius: 15,
    maxRadius: 29,
  };

  // Game state variables
  let enemiesEliminated = 0;
  let totalEnemiesSpawned = 0;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x331a1a);
  scene.fog = new THREE.Fog(0x331a1a, 5, 20);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    mount.clientWidth / mount.clientHeight,
    0.1,
    1000
  );

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  // Handle window resize
  const handleResize = () => {
    if (!mount) return;
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  };
  window.addEventListener("resize", handleResize);

  // Lighting setup
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(10, 10, 10);
  scene.add(dirLight);

  // Create environment
  setupEnvironment(scene);

  // Create player (green sphere)
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x90ff1e })
  );
  scene.add(sphere);

  // Create UI counter
  const counter = createCounter(mount, config.MAX_ENEMIES);

  // Game state
  const enemies: THREE.Mesh[] = [];
  let yaw = 0;
  const keysPressed: Record<string, boolean> = {};

  // Setup input handlers
  const inputHandlers = setupInputHandlers(
    mount,
    keysPressed,
    refs,
    (newYaw) => {
      yaw = newYaw;
    }
  );

  // Spawn a new enemy
  const spawnEnemy = () => {
    if (totalEnemiesSpawned >= config.MAX_ENEMIES) return;

    const enemy = createEnemy(config, sphere);
    scene.add(enemy);
    enemies.push(enemy);
    totalEnemiesSpawned++;
    updateCounter(counter, config.MAX_ENEMIES, enemiesEliminated);
  };

  // Update camera position
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

  // Initial render
  updateCamera();
  renderer.render(scene, camera);

  // Main game loop
  const animate = () => {
    refs.animationRef.current = requestAnimationFrame(animate);

    if (refs.gameStateRef.current === "playing") {
      // Spawn initial enemies
      if (totalEnemiesSpawned === 0) {
        for (let i = 0; i < config.MAX_ENEMIES; i++) {
          spawnEnemy();
        }
      }

      // Update player
      movePlayer(sphere, keysPressed, yaw, config);

      // Update enemies
      updateEnemies(enemies, sphere, scene, config, () => {
        enemiesEliminated++;
        updateCounter(counter, config.MAX_ENEMIES, enemiesEliminated);
        if (enemiesEliminated === config.MAX_ENEMIES) {
          refs.gameStateRef.current = "won";
          refs.setGameState("won");
          document.exitPointerLock();
        }
      });
    }

    updateCamera();
    renderer.render(scene, camera);
  };

  animate();

  // Cleanup function
  return () => {
    cancelAnimationFrame(refs.animationRef.current);
    mount.removeChild(renderer.domElement);
    mount.removeChild(counter);
    cleanup(inputHandlers);
  };
}

// Create the environment (blobs and walls)
function setupEnvironment(scene: THREE.Scene) {
  const blobMat = new THREE.MeshStandardMaterial({
    color: 0xaa6666,
    transparent: true,
    opacity: 0.3,
    roughness: 1,
  });

  // Add floating blobs
  for (let i = 0; i < 100; i++) {
    const blob = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), blobMat);
    blob.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );
    scene.add(blob);
  }

  // Add environment boundary
  const environment = new THREE.Mesh(
    new THREE.SphereGeometry(30, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x551111,
      side: THREE.BackSide,
      roughness: 1,
    })
  );
  scene.add(environment);
}

// Create UI counter element
function createCounter(mount: HTMLDivElement, maxEnemies: number) {
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
  counter.innerText = `Infected Cells Remaining: ${maxEnemies} / ${maxEnemies}`;
  mount.appendChild(counter);
  return counter;
}

// Update the counter display
function updateCounter(
  counter: HTMLDivElement,
  maxEnemies: number,
  eliminated: number
) {
  counter.innerText = `Infected Cells Remaining: ${
    maxEnemies - eliminated
  } / ${maxEnemies}`;
}

// Create a new enemy at random position
function createEnemy(config: GameConfig, sphere: THREE.Mesh) {
  const enemy = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );

  // Find random spawn position
  let x: number, z: number;
  do {
    const angle = Math.random() * Math.PI * 2;
    const r = config.spawnRadius * Math.sqrt(Math.random());
    x = Math.cos(angle) * r;
    z = Math.sin(angle) * r;
  } while (Math.hypot(x, z) < config.MIN_SPAWN_DISTANCE);

  enemy.position.set(x, sphere.position.y, z);

  // Set random velocity
  const dir = new THREE.Vector3(
    Math.random() - 0.5,
    0,
    Math.random() - 0.5
  ).normalize();
  (enemy.userData as any).velocity = dir.multiplyScalar(config.enemySpeed);

  return enemy;
}

// Setup keyboard and mouse input handlers
function setupInputHandlers(
  mount: HTMLDivElement,
  keysPressed: Record<string, boolean>,
  refs: GameRefs,
  setYaw: (yaw: number) => void
) {
  let yaw = 0;

  // Handle key presses
  const onKeyDown = (e: KeyboardEvent) => {
    keysPressed[e.key.toLowerCase()] = true;
  };

  const onKeyUp = (e: KeyboardEvent) => {
    keysPressed[e.key.toLowerCase()] = false;
  };

  // Handle mouse movement
  const onMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement !== mount) return;
    yaw -= e.movementX * 0.001;
    setYaw(yaw);
  };

  // Handle pointer lock changes
  const handlePointerLockChange = () => {
    if (
      document.pointerLockElement !== mount &&
      refs.gameStateRef.current === "playing"
    ) {
      refs.setGameState("paused");
    }
  };

  // Add event listeners
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("pointerlockchange", handlePointerLockChange);

  return { onKeyDown, onKeyUp, onMouseMove, handlePointerLockChange };
}

// Move player based on input
function movePlayer(
  sphere: THREE.Mesh,
  keysPressed: Record<string, boolean>,
  yaw: number,
  config: GameConfig
) {
  // Calculate movement direction
  const dir = new THREE.Vector3();
  if (keysPressed["w"]) dir.z -= 1;
  if (keysPressed["s"]) dir.z += 1;
  if (keysPressed["a"]) dir.x -= 1;
  if (keysPressed["d"]) dir.x += 1;

  // Apply movement with camera rotation
  if (dir.lengthSq() > 0) {
    dir.normalize();
    const sin = -Math.sin(yaw);
    const cos = Math.cos(yaw);
    sphere.position.x += (dir.x * cos - dir.z * sin) * config.speed;
    sphere.position.z += (dir.x * sin + dir.z * cos) * config.speed;
  }

  // Keep player within bounds
  const pxzLen = Math.hypot(sphere.position.x, sphere.position.z);
  if (pxzLen > config.maxRadius) {
    sphere.position.x *= config.maxRadius / pxzLen;
    sphere.position.z *= config.maxRadius / pxzLen;
  }
}

// Update all enemies each frame
function updateEnemies(
  enemies: THREE.Mesh[],
  sphere: THREE.Mesh,
  scene: THREE.Scene,
  config: GameConfig,
  onEnemyEliminated: () => void
) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const vel = (enemy.userData as any).velocity as THREE.Vector3;

    // Move enemy
    enemy.position.add(vel);
    enemy.position.y = sphere.position.y;

    // Bounce off walls
    const exzLen = Math.hypot(enemy.position.x, enemy.position.z);
    if (exzLen > config.maxRadius) {
      const normal = new THREE.Vector3(
        enemy.position.x / exzLen,
        0,
        enemy.position.z / exzLen
      );
      vel.reflect(normal);
      enemy.position.x = normal.x * config.maxRadius;
      enemy.position.z = normal.z * config.maxRadius;
    }

    // Check collision with player
    if (sphere.position.distanceTo(enemy.position) < 1.2) {
      scene.remove(enemy);
      enemies.splice(i, 1);
      onEnemyEliminated();
    }
  }
}

// Remove all event listeners
function cleanup(handlers: any) {
  window.removeEventListener("keydown", handlers.onKeyDown);
  window.removeEventListener("keyup", handlers.onKeyUp);
  document.removeEventListener("mousemove", handlers.onMouseMove);
  document.removeEventListener(
    "pointerlockchange",
    handlers.handlePointerLockChange
  );
}
