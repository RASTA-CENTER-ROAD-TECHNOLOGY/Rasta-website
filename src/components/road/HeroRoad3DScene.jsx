import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { createStudioEnvironment, createHighwayBridgeMaterials } from './roadShaders';

const VEHICLE_EXPLODE_OFFSETS = {
  Layer_01_Subgrade: -0.88,
  Layer_02_GSB: -0.44,
  Layer_03_WMM: 0.0,
  Layer_04_DBM: 0.44,
  Layer_05_BC_Carriageway: 0.88,
  Highway_Markings: 0.88,
  Highway_Barriers: 0.88,
  FWD_Sensor_Rig: 0.88,
  Survey_Beacons: 0.88,
  Vehicle_01_Truck: 0.88,
  Vehicle_02_Bus: 0.88,
  Vehicle_03_Car_Sedan: 0.88,
  Vehicle_04_Car_SUV: 0.88,
  Vehicle_05_Bike_01: 0.88,
  Vehicle_06_Bike_02: 0.88,
  Vehicle_07_Car_Hatch: 0.88,
  Vehicle_08_Truck_Hauler: 0.88,
};

const ZERO_EXPLODE_OFFSETS = Object.fromEntries(
  Object.keys(VEHICLE_EXPLODE_OFFSETS).map((k) => [k, 0])
);

const VIEW_MODES = [
  {
    id: 'assembled',
    label: 'Assembled Highway Corridor',
    telemetry: '4-Lane Divided Expressway | Live Mixed Traffic Simulation | IRC:37 Pavement Design',
    camPos: { x: 6.75, y: 2.75, z: 3.1 },
    camTarget: { x: -0.4, y: 0.55, z: 0.0 },
    explodeOffsets: ZERO_EXPLODE_OFFSETS,
  },
  {
    id: 'exploded',
    label: 'Exploded Pavement Strata',
    telemetry: 'BC 50 mm | DBM 100 mm | WMM 250 mm | GSB 200 mm | Riprap Subgrade Embankment',
    camPos: { x: 8.2, y: 4.4, z: 8.8 },
    camTarget: { x: 0, y: 0.35, z: 0 },
    explodeOffsets: VEHICLE_EXPLODE_OFFSETS,
  },
];

const VEHICLE_MOTION = {
  Vehicle_01_Truck: { dir: 1, speed: 2.6 },
  Vehicle_07_Car_Hatch: { dir: 1, speed: 3.4 },
  Vehicle_03_Car_Sedan: { dir: 1, speed: 4.2 },
  Vehicle_05_Bike_01: { dir: 1, speed: 4.5 },
  Vehicle_04_Car_SUV: { dir: -1, speed: 3.8 },
  Vehicle_06_Bike_02: { dir: -1, speed: 4.4 },
  Vehicle_02_Bus: { dir: -1, speed: 2.8 },
  Vehicle_08_Truck_Hauler: { dir: -1, speed: 2.4 },
};

const LAYER_CALLOUTS = [
  { code: 'BC 50 mm', name: 'Bituminous Concrete', spec: 'MoRT&H Sec. 509' },
  { code: 'DBM 100 mm', name: 'Dense Bituminous Macadam', spec: 'IRC:37 Binder' },
  { code: 'WMM 250 mm', name: 'Wet Mix Macadam', spec: 'MoRT&H Clause 406' },
  { code: 'GSB 200 mm', name: 'Granular Sub-Base', spec: 'MoRT&H Clause 401' },
  { code: 'SUBGRADE', name: 'Riprap & Compacted Soil', spec: 'CBR >= 8%' },
];

const getCameraFov = (w) => ((w || 800) < 768 ? 44 : 35);

const getResponsiveFitScale = (w, h) => {
  const aspect = (w || 1) / (h || 1);
  const isMobile = (w || 800) < 768;
  if (isMobile) {
    return Math.min(2.45, Math.max(1.65, 2.25 / Math.max(aspect, 0.65)));
  }
  return aspect < 2.2 ? Math.min(1.85, 2.2 / Math.max(aspect, 0.85)) : 1.0;
};

const getEffectiveCamPos = (modeObj, w) => {
  if ((w || 800) < 768 && modeObj.id === 'assembled') {
    return { x: 7.4, y: 3.3, z: 4.8 };
  }
  return { ...modeObj.camPos };
};

const getEffectiveTarget = (modeObj, w) => {
  if ((w || 800) < 768 && modeObj.id === 'assembled') {
    return { x: 0.0, y: 0.55, z: 0.0 };
  }
  return { ...modeObj.camTarget };
};

function createProceduralFallbackGroup(bridgeMaterials) {
  const group = new THREE.Group();
  const makeBox = (name, w, h, d, y, colorHex, roughness = 0.7) => {
    const geom = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    mesh.position.set(0, y, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  makeBox('Layer_01_Subgrade', 13.4, 0.54, 7.6, -0.82, 0x7c4a2a, 0.94);
  makeBox('Layer_02_GSB', 12.8, 0.26, 6.2, -0.41, 0xc2a26a, 0.86);
  makeBox('Layer_03_WMM', 12.2, 0.24, 5.6, -0.16, 0x6a7e98, 0.78);
  makeBox('Layer_04_DBM', 11.9, 0.16, 5.2, 0.04, 0x3a4454, 0.66);
  makeBox('Layer_05_BC_Carriageway', 11.8, 0.12, 5.15, 0.18, 0x1e222a, 0.56);

  const barriersGroup = new THREE.Group();
  barriersGroup.name = 'Highway_Barriers';
  const concreteMat = bridgeMaterials ? bridgeMaterials.barrierConcrete : new THREE.MeshStandardMaterial({ color: 0xc2c6cc, roughness: 0.72 });
  const railMat = bridgeMaterials ? bridgeMaterials.galvanizedRail : new THREE.MeshStandardMaterial({ color: 0xd8dde4, metalness: 0.88, roughness: 0.3 });

  [-2.44, 2.44].forEach((z) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.54, 0.28), concreteMat);
    wall.position.set(0, 0.52, z);
    wall.castShadow = true;
    wall.receiveShadow = true;
    barriersGroup.add(wall);

    const railGeom = new THREE.BoxGeometry(11.6, 0.06, 0.05);
    const railTop = new THREE.Mesh(railGeom, railMat);
    railTop.position.set(0, 0.88, z);
    railTop.castShadow = true;
    barriersGroup.add(railTop);

    const railMid = new THREE.Mesh(railGeom, railMat);
    railMid.position.set(0, 0.74, z);
    railMid.castShadow = true;
    barriersGroup.add(railMid);

    for (let x = -5.0; x <= 5.0; x += 1.45) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.06), railMat);
      post.position.set(x, 0.76, z);
      post.castShadow = true;
      barriersGroup.add(post);
    }
  });
  group.add(barriersGroup);

  const gantryGroup = new THREE.Group();
  gantryGroup.name = 'FWD_Sensor_Rig';
  const navyMat = bridgeMaterials ? bridgeMaterials.bridgeSteel : new THREE.MeshStandardMaterial({ color: 0x0a2b5c, roughness: 0.28, metalness: 0.76 });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 5.1), navyMat);
  beam.position.set(0, 2.08, 0);
  beam.castShadow = true;
  gantryGroup.add(beam);

  [-2.52, 2.52].forEach((z) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.34, 2.08, 0.34), navyMat);
    col.position.set(0, 1.04, z);
    col.castShadow = true;
    gantryGroup.add(col);
  });

  if (bridgeMaterials?.gantrySign) {
    [-1.05, 1.05].forEach((zPos) => {
      const signMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 1.45), bridgeMaterials.gantrySign);
      signMesh.position.set(0.24, 1.98, zPos);
      signMesh.castShadow = true;
      gantryGroup.add(signMesh);
    });
  }
  group.add(gantryGroup);

  const fallbackVehicles = [
    { name: 'Vehicle_01_Truck', w: 1.5, h: 0.52, d: 0.44, x: -2.6, z: 1.64, color: 0x0f3d7a },
    { name: 'Vehicle_07_Car_Hatch', w: 0.9, h: 0.3, d: 0.38, x: 2.6, z: 1.64, color: 0xf1f5f9 },
    { name: 'Vehicle_03_Car_Sedan', w: 0.96, h: 0.3, d: 0.38, x: 1.8, z: 0.58, color: 0xb91c1c },
    { name: 'Vehicle_05_Bike_01', w: 0.45, h: 0.28, d: 0.14, x: -3.4, z: 0.58, color: 0xdc2626 },
    { name: 'Vehicle_04_Car_SUV', w: 0.98, h: 0.35, d: 0.4, x: -1.6, z: -0.58, color: 0x94a3b8 },
    { name: 'Vehicle_06_Bike_02', w: 0.45, h: 0.28, d: 0.14, x: 3.5, z: -0.58, color: 0x1d4ed8 },
    { name: 'Vehicle_02_Bus', w: 1.62, h: 0.5, d: 0.46, x: 1.8, z: -1.64, color: 0xd97706 },
    { name: 'Vehicle_08_Truck_Hauler', w: 1.45, h: 0.48, d: 0.44, x: -3.5, z: -1.64, color: 0xb91c1c },
  ];
  fallbackVehicles.forEach((v) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(v.w, v.h, v.d),
      new THREE.MeshStandardMaterial({ color: v.color, roughness: 0.35, metalness: 0.4 })
    );
    mesh.name = v.name;
    mesh.position.set(v.x, 0.252 + v.h * 0.5, v.z);
    mesh.castShadow = true;
    group.add(mesh);
  });

  return group;
}

export default function HeroRoad3DScene() {
  const containerRef = useRef(null);
  const canvasHostRef = useRef(null);
  const [viewMode, setViewMode] = useState('assembled');
  const [webglReady, setWebglReady] = useState(true);

  const sceneApiRef = useRef(null);

  const activeConfig = VIEW_MODES.find((m) => m.id === viewMode) || VIEW_MODES[0];

  useEffect(() => {
    const host = canvasHostRef.current;
    const sectionEl = containerRef.current;
    if (!host || !sectionEl) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglReady(false);
      return undefined;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const width = host.clientWidth || 1100;
    const height = host.clientHeight || 450;
    const isNarrowViewport = width < 768;
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy() || 4, 8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isNarrowViewport ? 1.5 : 2));
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    host.innerHTML = '';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envRT = createStudioEnvironment(renderer);
    scene.environment = envRT.texture;

    const initialMode = VIEW_MODES[0];
    let viewportWidth = width;
    let activeModeObj = initialMode;
    const currentCamBase = getEffectiveCamPos(initialMode, viewportWidth);
    const currentTargetBase = getEffectiveTarget(initialMode, viewportWidth);
    let fitScale = getResponsiveFitScale(width, height);

    const camera = new THREE.PerspectiveCamera(
      getCameraFov(viewportWidth),
      width / height,
      0.1,
      140
    );
    camera.position.set(
      currentCamBase.x * fitScale,
      currentCamBase.y * fitScale,
      currentCamBase.z * fitScale
    );
    const camTarget = new THREE.Vector3(
      currentTargetBase.x,
      currentTargetBase.y,
      currentTargetBase.z
    );
    camera.lookAt(camTarget);

    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0xd4dbe5, 1.25);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffcf5, 2.35);
    keyLight.position.set(11, 17, 10);
    keyLight.castShadow = true;
    const shadowSize = isNarrowViewport ? 1024 : 2048;
    keyLight.shadow.mapSize.width = shadowSize;
    keyLight.shadow.mapSize.height = shadowSize;
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 42;
    const d = 10;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xbfdbfe, 0.95);
    rimLight.position.set(-10, 8, -9);
    scene.add(rimLight);

    const gridHelper = new THREE.GridHelper(32, 32, 0xcbd5e1, 0xe5e7eb);
    gridHelper.position.y = -1.14;
    gridHelper.material.opacity = 0.45;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 36),
      new THREE.ShadowMaterial({ opacity: 0.12 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.135;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const rootPivot = new THREE.Group();
    scene.add(rootPivot);

    const bridgeMaterials = createHighwayBridgeMaterials(maxAnisotropy);

    const modelHolder = new THREE.Group();
    rootPivot.add(modelHolder);

    const namedLayers = new Map();
    const vehicleStates = [];
    const layerOffsets = { ...ZERO_EXPLODE_OFFSETS };
    const introState = { explodeFactor: prefersReduced ? 0 : 1.0 };

    const enhanceMaterialTextures = (mat) => {
      if (!mat) return;
      mat.envMapIntensity = 1.18;
      ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap'].forEach((texKey) => {
        if (mat[texKey]) {
          mat[texKey].anisotropy = maxAnisotropy;
          mat[texKey].needsUpdate = true;
        }
      });
      mat.needsUpdate = true;
    };

    const resolveMaterial = (mat) => {
      if (!mat) return mat;
      if (mat.name === 'Mat_Barrier_Concrete') {
        return bridgeMaterials.barrierConcrete;
      }
      if (mat.name === 'Mat_Galvanized_Rail') {
        return bridgeMaterials.galvanizedRail;
      }
      if (mat.name === 'Mat_Steel_Navy') {
        return bridgeMaterials.bridgeSteel;
      }
      if (mat.name === 'Mat_Gantry_SignGreen') {
        return bridgeMaterials.gantrySign;
      }
      enhanceMaterialTextures(mat);
      return mat;
    };

    const registerModelTree = (tree) => {
      modelHolder.clear();
      namedLayers.clear();
      vehicleStates.length = 0;

      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (Array.isArray(child.material)) {
            child.material = child.material.map(resolveMaterial);
          } else {
            child.material = resolveMaterial(child.material);
          }
        }
        if (child.name && Object.prototype.hasOwnProperty.call(layerOffsets, child.name)) {
          namedLayers.set(child.name, {
            node: child,
            baseY: child.position.y,
          });
          if (Object.prototype.hasOwnProperty.call(VEHICLE_MOTION, child.name)) {
            const motion = VEHICLE_MOTION[child.name];
            vehicleStates.push({
              name: child.name,
              node: child,
              x: child.position.x,
              dir: motion.dir,
              speed: motion.speed,
              phase: vehicleStates.length * 1.15,
            });
          }
        }
      });

      // Attach Welcome signboards on both lanes (left and right) of the gantry
      const surveyBeaconsNode = tree.getObjectByName('Survey_Beacons');
      if (surveyBeaconsNode && !surveyBeaconsNode.getObjectByName('Signboard_Overlay_Lane1_Front')) {
        const signGeo = new THREE.PlaneGeometry(1.45, 0.42);
        const signTex = new THREE.TextureLoader().load('/textures/gantry_sign_diffuse.png');
        signTex.colorSpace = THREE.SRGBColorSpace;
        const signOverlayMat = new THREE.MeshStandardMaterial({
          map: signTex,
          roughness: 0.28,
          metalness: 0.05,
          polygonOffset: true,
          polygonOffsetFactor: -1.5,
          polygonOffsetUnits: -1.5,
        });

        const backSignBoxGeo = new THREE.BoxGeometry(0.08, 0.42, 1.45);
        const backSignMat = bridgeMaterials?.gantrySign || new THREE.MeshStandardMaterial({ color: 0x1e6b37, roughness: 0.35 });

        // Add matching Welcome signboards over both lanes (Z = -1.05 and Z = +1.05)
        [-1.05, 1.05].forEach((zPos, idx) => {
          const sideName = idx === 0 ? 'Lane1' : 'Lane2';

          // Front face (+X face): faces oncoming +X traffic and default camera view
          const frontSign = new THREE.Mesh(signGeo, signOverlayMat);
          frontSign.name = `Signboard_Overlay_${sideName}_Front`;
          frontSign.position.set(0.262, 1.98, zPos);
          frontSign.rotation.y = Math.PI / 2;
          frontSign.receiveShadow = true;
          surveyBeaconsNode.add(frontSign);

          // 3D physical green signboard box on back (-X) side to eliminate beam clipping from behind
          const backBox = new THREE.Mesh(backSignBoxGeo, backSignMat);
          backBox.position.set(-0.22, 1.98, zPos);
          backBox.castShadow = true;
          surveyBeaconsNode.add(backBox);

          // Back face (-X face): faces oncoming -X traffic and rear camera view
          const backSign = new THREE.Mesh(signGeo, signOverlayMat);
          backSign.name = `Signboard_Overlay_${sideName}_Back`;
          backSign.position.set(-0.262, 1.98, zPos);
          backSign.rotation.y = -Math.PI / 2;
          backSign.receiveShadow = true;
          surveyBeaconsNode.add(backSign);
        });
      }

      modelHolder.add(tree);
    };

    registerModelTree(createProceduralFallbackGroup(bridgeMaterials));

    const loader = new GLTFLoader();
    let active = true;
    loader.load(
      '/models/rasta_highway.glb',
      (gltf) => {
        if (!active || !gltf?.scene) return;
        registerModelTree(gltf.scene);
      },
      undefined,
      () => {
        // Fallback stays active
      }
    );

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.to(introState, {
          explodeFactor: 0,
          duration: 1.4,
          ease: 'power3.out',
        });
      }
    }, sectionEl);

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      dragYaw: 0,
      autoYaw: 0,
      dragging: false,
      lastX: 0,
      activePointerId: null,
    };
    const onPointerDown = (e) => {
      pointer.dragging = true;
      pointer.lastX = e.clientX;
      pointer.activePointerId = e.pointerId;
      try {
        e.currentTarget?.setPointerCapture(e.pointerId);
      } catch { }
    };
    const onPointerUp = (e) => {
      pointer.dragging = false;
      pointer.activePointerId = null;
      try {
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
      } catch { }
    };
    const onPointerCancel = () => {
      pointer.dragging = false;
      pointer.activePointerId = null;
    };
    const onPointerMove = (e) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (pointer.dragging) {
        pointer.dragYaw += (e.clientX - pointer.lastX) * 0.007;
        pointer.lastX = e.clientX;
      }
      pointer.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      if (!pointer.dragging) {
        pointer.targetX = 0;
        pointer.targetY = 0;
      }
    };

    host.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);

    const applyMode = (modeObj) => {
      activeModeObj = modeObj;
      const dur = prefersReduced ? 0 : 0.9;
      const nextCam = getEffectiveCamPos(modeObj, viewportWidth);
      const nextTarget = getEffectiveTarget(modeObj, viewportWidth);
      currentCamBase.x = nextCam.x;
      currentCamBase.y = nextCam.y;
      currentCamBase.z = nextCam.z;
      gsap.to(camera.position, {
        x: currentCamBase.x * fitScale,
        y: currentCamBase.y * fitScale,
        z: currentCamBase.z * fitScale,
        duration: dur,
        ease: 'power3.inOut',
      });
      gsap.to(camTarget, {
        x: nextTarget.x,
        y: nextTarget.y,
        z: nextTarget.z,
        duration: dur,
        ease: 'power3.inOut',
      });
      gsap.to(layerOffsets, {
        ...modeObj.explodeOffsets,
        duration: dur,
        ease: 'power3.inOut',
      });
    };

    sceneApiRef.current = { applyMode };

    let isInViewport = true;
    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const animate = (timestamp) => {
      if (!active || !isInViewport) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(animate);

      const now = timestamp || performance.now();
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.06);
      lastTime = now;
      elapsed += dt;

      if (!pointer.dragging) {
        pointer.autoYaw += dt * (viewportWidth < 768 ? 0.24 : 0.16);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      const idlePitch = prefersReduced ? 0 : Math.sin(elapsed * 0.4) * 0.02;
      rootPivot.rotation.y = pointer.autoYaw + pointer.dragYaw + pointer.x * 0.14;
      rootPivot.rotation.x = idlePitch + pointer.y * 0.03;

      const introDefaults = VIEW_MODES[1].explodeOffsets;

      namedLayers.forEach(({ node, baseY }, name) => {
        const modeDelta = layerOffsets[name] || 0;
        const introDelta = (introDefaults[name] || 0) * introState.explodeFactor;
        node.position.y = baseY + modeDelta + introDelta;
      });

      // Live highway vehicle traffic movement & suspension oscillation (always active!)
      const halfSpan = 5.45;
      vehicleStates.forEach((v) => {
        v.x += v.dir * v.speed * dt;
        if (v.x > halfSpan) v.x = -halfSpan;
        if (v.x < -halfSpan) v.x = halfSpan;
        v.node.position.x = v.x;
        v.node.position.y += Math.sin(elapsed * 9.0 + v.phase) * 0.0025;
        const edgeScale = THREE.MathUtils.clamp((halfSpan - Math.abs(v.x)) / 0.55, 0.02, 1.0);
        v.node.scale.setScalar(edgeScale);
      });

      camera.lookAt(camTarget);
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!rafId && active && isInViewport) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        lastTime = performance.now();
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onWindowTouchEnd = () => {
      pointer.dragging = false;
      pointer.activePointerId = null;
    };
    window.addEventListener('touchend', onWindowTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onWindowTouchEnd, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0]?.isIntersecting ?? true;
        if (isInViewport) {
          startLoop();
        } else {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0 }
    );
    intersectionObserver.observe(host);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width || 800;
      const h = entry.contentRect.height || 450;
      viewportWidth = w;
      fitScale = getResponsiveFitScale(w, h);
      const nextCam = getEffectiveCamPos(activeModeObj, w);
      const nextTarget = getEffectiveTarget(activeModeObj, w);
      currentCamBase.x = nextCam.x;
      currentCamBase.y = nextCam.y;
      currentCamBase.z = nextCam.z;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2));
      camera.fov = getCameraFov(w);
      camera.aspect = w / h;
      camera.position.set(
        currentCamBase.x * fitScale,
        currentCamBase.y * fitScale,
        currentCamBase.z * fitScale
      );
      camTarget.set(nextTarget.x, nextTarget.y, nextTarget.z);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    startLoop();

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('touchend', onWindowTouchEnd);
      window.removeEventListener('touchcancel', onWindowTouchEnd);
      host.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      ctx.revert();
      envRT.dispose();
      bridgeMaterials.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
    };
  }, []);

  const handleModeChange = (modeId) => {
    setViewMode(modeId);
    const found = VIEW_MODES.find((m) => m.id === modeId);
    if (found && sceneApiRef.current) {
      sceneApiRef.current.applyMode(found);
    }
  };

  return (
    <div className="hero-3d-stage" ref={containerRef}>
      <div className="hero-3d-viewport">
        {webglReady ? (
          <div
            ref={canvasHostRef}
            className="hero-3d-canvas-host"
            aria-label="Interactive Three.js 3D highway pavement engineering model"
          />
        ) : (
          <div className="hero-3d-fallback">
            <img
              src="/images/pavement-strata-diagram.png"
              alt="Multi-layer highway pavement cross-section engineering model"
            />
          </div>
        )}
      </div>

      <div className="hero-3d-dock">
        <div className="hero-3d-dock__top">
          <div className="hero-3d-modes" role="tablist" aria-label="3D Highway View Modes">
            {VIEW_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={viewMode === m.id}
                className={`hero-3d-mode-btn ${viewMode === m.id ? 'is-active' : ''}`}
                onClick={() => handleModeChange(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="hero-3d-telemetry">
            <span>{activeConfig.telemetry}</span>
          </div>
        </div>

        <div className="hero-3d-strata-bar" aria-label="Highway Structural Layer Thicknesses">
          {LAYER_CALLOUTS.map((layer) => (
            <div key={layer.code} className="hero-3d-stratum-item">
              <span className="hero-3d-stratum-code">{layer.code}</span>
              <span className="hero-3d-stratum-name">{layer.name}</span>
              <span className="hero-3d-stratum-spec">{layer.spec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
