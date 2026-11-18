import * as THREE from 'three';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a studio softbox HDRI environment map via PMREMGenerator
 * for realistic reflections on metallic gantry trusses and asphalt micro-facets.
 */
export function createStudioEnvironment(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0xf5f5f7);

  const overheadBox = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  overheadBox.position.set(0, 9, 0);
  overheadBox.rotation.x = Math.PI / 2;
  envScene.add(overheadBox);

  const coolSideBox = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 8),
    new THREE.MeshBasicMaterial({ color: 0xdbeafe, side: THREE.DoubleSide })
  );
  coolSideBox.position.set(-10, 4, -6);
  coolSideBox.lookAt(0, 0, 0);
  envScene.add(coolSideBox);

  const warmSideBox = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 7),
    new THREE.MeshBasicMaterial({ color: 0xfef3c7, side: THREE.DoubleSide })
  );
  warmSideBox.position.set(10, 3, 7);
  warmSideBox.lookAt(0, 0, 0);
  envScene.add(warmSideBox);

  const envRT = pmrem.fromScene(envScene, 0.04);
  overheadBox.geometry.dispose();
  overheadBox.material.dispose();
  coolSideBox.geometry.dispose();
  coolSideBox.material.dispose();
  warmSideBox.geometry.dispose();
  warmSideBox.material.dispose();
  pmrem.dispose();

  return envRT;
}

const PRESETS = {
  asphalt: {
    seed: 101,
    base: [30, 34, 42],
    speckCount: 2800,
    minSize: 1,
    maxSize: 3,
    roughness: 0.48,
    metalness: 0.08,
    bumpScale: 0.032,
    strataBands: false,
  },
  binder: {
    seed: 202,
    base: [58, 68, 84],
    speckCount: 1650,
    minSize: 3,
    maxSize: 8,
    roughness: 0.66,
    metalness: 0.05,
    bumpScale: 0.06,
    strataBands: false,
  },
  wmm: {
    seed: 303,
    base: [106, 126, 152],
    speckCount: 1050,
    minSize: 5,
    maxSize: 13,
    roughness: 0.78,
    metalness: 0.04,
    bumpScale: 0.09,
    strataBands: false,
  },
  gsb: {
    seed: 404,
    base: [194, 162, 106],
    speckCount: 2000,
    minSize: 2,
    maxSize: 7,
    roughness: 0.86,
    metalness: 0.02,
    bumpScale: 0.068,
    strataBands: false,
  },
  subgrade: {
    seed: 505,
    base: [124, 74, 42],
    speckCount: 2100,
    minSize: 2,
    maxSize: 6,
    roughness: 0.94,
    metalness: 0.0,
    bumpScale: 0.075,
    strataBands: true,
  },
  concrete: {
    seed: 606,
    base: [214, 218, 224],
    speckCount: 1400,
    minSize: 1,
    maxSize: 3,
    roughness: 0.64,
    metalness: 0.04,
    bumpScale: 0.02,
    strataBands: false,
  },
};

/**
 * Create a seeded procedural CanvasTexture pair (albedo + bump) + PBR StandardMaterial
 * for highway and pavement engineering layers.
 */
export function createPavementStandardMaterial(presetKey, repeatX = 4, repeatY = 2) {
  const cfg = PRESETS[presetKey] || PRESETS.asphalt;
  const rand = mulberry32(cfg.seed);
  const size = 256;

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const ctxA = albedoCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const ctxB = bumpCanvas.getContext('2d');

  ctxA.fillStyle = `rgb(${cfg.base[0]}, ${cfg.base[1]}, ${cfg.base[2]})`;
  ctxA.fillRect(0, 0, size, size);

  ctxB.fillStyle = 'rgb(128, 128, 128)';
  ctxB.fillRect(0, 0, size, size);

  if (cfg.strataBands) {
    for (let y = 0; y < size; y += 16) {
      const shade = Math.round((rand() - 0.5) * 26);
      ctxA.fillStyle = `rgba(${Math.max(0, cfg.base[0] + shade)}, ${Math.max(
        0,
        cfg.base[1] + shade
      )}, ${Math.max(0, cfg.base[2] + shade)}, 0.45)`;
      ctxA.fillRect(0, y, size, 8 + rand() * 8);
    }
  }

  for (let i = 0; i < cfg.speckCount; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const w = cfg.minSize + rand() * (cfg.maxSize - cfg.minSize);
    const h = cfg.minSize + rand() * (cfg.maxSize - cfg.minSize);
    const delta = Math.round((rand() - 0.48) * 64);

    const r = Math.min(255, Math.max(0, cfg.base[0] + delta));
    const g = Math.min(255, Math.max(0, cfg.base[1] + delta));
    const b = Math.min(255, Math.max(0, cfg.base[2] + delta));
    ctxA.fillStyle = `rgb(${r}, ${g}, ${b})`;

    const hVal = Math.min(255, Math.max(0, Math.round(128 + delta * 1.8)));
    ctxB.fillStyle = `rgb(${hVal}, ${hVal}, ${hVal})`;

    if (presetKey === 'wmm' || presetKey === 'gsb') {
      ctxA.save();
      ctxA.translate(x, y);
      ctxA.rotate(rand() * Math.PI);
      ctxA.fillRect(-w * 0.5, -h * 0.5, w, h);
      ctxA.restore();

      ctxB.save();
      ctxB.translate(x, y);
      ctxB.rotate(rand() * Math.PI);
      ctxB.fillRect(-w * 0.5, -h * 0.5, w, h);
      ctxB.restore();
    } else {
      ctxA.fillRect(x, y, w, h);
      ctxB.fillRect(x, y, w, h);
    }
  }

  const mapTex = new THREE.CanvasTexture(albedoCanvas);
  mapTex.wrapS = THREE.RepeatWrapping;
  mapTex.wrapT = THREE.RepeatWrapping;
  mapTex.repeat.set(repeatX, repeatY);
  mapTex.colorSpace = THREE.SRGBColorSpace;

  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.RepeatWrapping;
  bumpTex.repeat.set(repeatX, repeatY);

  const material = new THREE.MeshStandardMaterial({
    map: mapTex,
    bumpMap: bumpTex,
    bumpScale: cfg.bumpScale,
    roughness: cfg.roughness,
    metalness: cfg.metalness,
    envMapIntensity: 1.05,
  });

  return {
    material,
    dispose: () => {
      mapTex.dispose();
      bumpTex.dispose();
      material.dispose();
    },
  };
}

/**
 * Create dedicated PBR textured materials for highway bridge gantry, concrete barriers,
 * galvanized railings, and overhead highway signage.
 */
export function createHighwayBridgeMaterials(maxAnisotropy = 4) {
  const loader = new THREE.TextureLoader();
  const disposables = [];

  const loadTex = (url, isColor = false, repeatX = 1, repeatY = 1) => {
    const tex = loader.load(url);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.anisotropy = maxAnisotropy;
    if (isColor) {
      tex.colorSpace = THREE.SRGBColorSpace;
    }
    disposables.push(tex);
    return tex;
  };

  // 1. Concrete Parapet Barriers (Precast slipform with construction joints & aggregate)
  const barrierConcrete = new THREE.MeshStandardMaterial({
    name: 'Mat_Barrier_Concrete',
    map: loadTex('/textures/barrier_concrete_diffuse.png', true, 2, 1),
    bumpMap: loadTex('/textures/barrier_concrete_bump.png', false, 2, 1),
    bumpScale: 0.045,
    roughnessMap: loadTex('/textures/barrier_concrete_roughness.png', false, 2, 1),
    roughness: 0.78,
    metalness: 0.02,
    envMapIntensity: 1.1,
  });
  disposables.push(barrierConcrete);

  // 2. Galvanized Steel Railings (Hot-dip zinc crystal spangles & longitudinal brushed finish)
  const galvanizedRail = new THREE.MeshStandardMaterial({
    name: 'Mat_Galvanized_Rail',
    map: loadTex('/textures/galvanized_rail_diffuse.png', true, 3, 2),
    bumpMap: loadTex('/textures/galvanized_rail_bump.png', false, 3, 2),
    bumpScale: 0.032,
    roughnessMap: loadTex('/textures/galvanized_rail_roughness.png', false, 3, 2),
    roughness: 0.3,
    metalness: 0.9,
    envMapIntensity: 1.55,
  });
  disposables.push(galvanizedRail);

  // 3. Structural Navy Bridge Steel (Heavy girder plates, rivets, weld seams)
  const bridgeSteel = new THREE.MeshStandardMaterial({
    name: 'Mat_Steel_Navy',
    map: loadTex('/textures/bridge_steel_diffuse.png', true, 2, 2),
    bumpMap: loadTex('/textures/bridge_steel_bump.png', false, 2, 2),
    bumpScale: 0.048,
    roughnessMap: loadTex('/textures/bridge_steel_roughness.png', false, 2, 2),
    roughness: 0.32,
    metalness: 0.78,
    envMapIntensity: 1.35,
  });
  disposables.push(bridgeSteel);

  // 4. Overhead Highway Signage (Retro-reflective prismatic green face & borders)
  const gantrySign = new THREE.MeshStandardMaterial({
    name: 'Mat_Gantry_SignGreen',
    map: loadTex('/textures/gantry_sign_diffuse.png', true, 1, 1),
    bumpMap: loadTex('/textures/gantry_sign_bump.png', false, 1, 1),
    bumpScale: 0.025,
    roughness: 0.28,
    metalness: 0.06,
    envMapIntensity: 1.25,
  });
  disposables.push(gantrySign);

  return {
    barrierConcrete,
    galvanizedRail,
    bridgeSteel,
    gantrySign,
    dispose: () => {
      disposables.forEach((item) => {
        if (item && typeof item.dispose === 'function') {
          item.dispose();
        }
      });
    },
  };
}

/**
 * Custom GLSL Fresnel + Precision Contour Shader overlay for inspecting
 * a selected structural stratum inside PavementStrata3DViewer.
 */
export function createStratumHighlightShader() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uOpacity: { value: 0.0 },
      uColor: { value: new THREE.Color(0x004499) },
    },
    vertexShader: `
      varying vec3 vNormalDir;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;
      void main() {
        vLocalPos = position;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vNormalDir = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      uniform vec3 uColor;
      varying vec3 vNormalDir;
      varying vec3 vViewDir;
      varying vec3 vLocalPos;

      void main() {
        float fresnel = pow(1.0 - max(dot(normalize(vNormalDir), normalize(vViewDir)), 0.0), 2.2);
        float scan = smoothstep(0.65, 0.98, sin(vLocalPos.x * 5.0 - uTime * 3.0)) * 0.28;
        float alpha = clamp((fresnel * 0.65 + scan + 0.08) * uOpacity, 0.0, 0.68);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
}
