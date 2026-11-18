import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import {
  createPavementStandardMaterial,
  createStratumHighlightShader,
  createStudioEnvironment,
} from './roadShaders';

const STRATUM_ORDER = [
  { name: 'Stratum_01_Surface', idx: 0, label: 'Surface Course (BC / SMA / PQC)' },
  { name: 'Stratum_02_Binder', idx: 1, label: 'Binder Course (DBM / DLC)' },
  { name: 'Stratum_03_Base', idx: 2, label: 'Base Course (WMM)' },
  { name: 'Stratum_04_Subbase', idx: 3, label: 'Granular Sub-Base (GSB)' },
  { name: 'Stratum_05_Subgrade', idx: 4, label: 'Compacted Soil Subgrade' },
];

function createStrataFallback() {
  const group = new THREE.Group();
  const makeSlab = (name, h, y, colorHex, roughness) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, h, 3.6),
      new THREE.MeshStandardMaterial({ color: colorHex, roughness })
    );
    mesh.name = name;
    mesh.position.set(0, y, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  };

  makeSlab('Stratum_01_Surface', 0.36, 0.92, 0x1d2129, 0.5);
  makeSlab('Stratum_02_Binder', 0.38, 0.5, 0x333d4a, 0.62);
  makeSlab('Stratum_03_Base', 0.44, 0.04, 0x707a8a, 0.78);
  makeSlab('Stratum_04_Subbase', 0.46, -0.45, 0x9c9487, 0.86);
  makeSlab('Stratum_05_Subgrade', 0.62, -1.03, 0x785a3a, 0.94);

  const markings = new THREE.Group();
  markings.name = 'Stratum_01_Markings';
  const mMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
  [-1.15, 0, 1.15].forEach((x) => {
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.022, 0.1), mMat);
    dash.position.set(x, 0.186, 0);
    markings.add(dash);
  });
  markings.position.set(0, 0.92, 0);
  group.add(markings);

  return group;
}

const getStrataFov = (w) => ((w || 480) < 768 ? 40 : 35);

const getStrataFitScale = (w, h) => {
  const aspect = (w || 1) / (h || 1);
  if ((w || 480) < 768 || aspect < 1.65) {
    return Math.min(1.65, Math.max(1.18, 1.58 / Math.max(aspect, 0.72)));
  }
  return 1.0;
};

export default function PavementStrata3DViewer({ activeIndex = 0, onSelectLayer }) {
  const hostRef = useRef(null);
  const [exploded, setExploded] = useState(false);
  const [webglReady, setWebglReady] = useState(true);
  const [modelReady, setModelReady] = useState(false);

  const apiRef = useRef(null);
  const onSelectRef = useRef(onSelectLayer);
  onSelectRef.current = onSelectLayer;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

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

    const width = host.clientWidth || 480;
    const height = host.clientHeight || 290;
    const isNarrow = width < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    host.innerHTML = '';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envRT = createStudioEnvironment(renderer);
    scene.environment = envRT.texture;

    const fitScale = getStrataFitScale(width, height);
    const camera = new THREE.PerspectiveCamera(getStrataFov(width), width / height, 0.1, 60);
    camera.position.set(5.9 * fitScale, 3.8 * fitScale, 5.9 * fitScale);
    camera.lookAt(0, -0.05, 0);

    const hemi = new THREE.HemisphereLight(0xffffff, 0xd8e3ef, 1.15);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.9);
    key.position.set(6, 10, 7);
    key.castShadow = true;
    key.shadow.mapSize.width = 1024;
    key.shadow.mapSize.height = 1024;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x93c5fd, 0.9);
    fill.position.set(-6, 4, -5);
    scene.add(fill);

    const shadowCatcher = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.12 })
    );
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.y = -1.45;
    shadowCatcher.receiveShadow = true;
    scene.add(shadowCatcher);

    const pivot = new THREE.Group();
    scene.add(pivot);

    const modelRoot = new THREE.Group();
    pivot.add(modelRoot);

    const matPacks = {
      surface: createPavementStandardMaterial('asphalt', 3, 3),
      binder: createPavementStandardMaterial('binder', 3, 3),
      base: createPavementStandardMaterial('wmm', 3, 3),
      subbase: createPavementStandardMaterial('gsb', 3, 3),
      subgrade: createPavementStandardMaterial('subgrade', 3, 3),
    };
    const markMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });

    const MAT_BY_NODE = {
      Stratum_01_Surface: matPacks.surface.material,
      Stratum_01_Markings: markMat,
      Stratum_02_Binder: matPacks.binder.material,
      Stratum_03_Base: matPacks.base.material,
      Stratum_04_Subbase: matPacks.subbase.material,
      Stratum_05_Subgrade: matPacks.subgrade.material,
    };

    // GLSL highlight sleeve around the active stratum
    const highlightShaderMat = createStratumHighlightShader();
    const highlightMesh = new THREE.Mesh(
      new THREE.BoxGeometry(3.78, 0.44, 3.78),
      highlightShaderMat
    );
    pivot.add(highlightMesh);

    const layerNodes = [];
    const offsetsY = [0, 0, 0, 0, 0];
    const offsetsZ = [0, 0, 0, 0, 0];

    const attachNamesToLayerList = (tree) => {
      modelRoot.clear();
      layerNodes.length = 0;

      const findObj = (n) => tree.getObjectByName(n);
      const markingNode = findObj('Stratum_01_Markings');

      STRATUM_ORDER.forEach((s) => {
        const obj = findObj(s.name);
        if (obj) {
          layerNodes.push({
            idx: s.idx,
            name: s.name,
            node: obj,
            baseY: obj.position.y,
            baseZ: obj.position.z,
            companions:
              s.idx === 0
                ? [markingNode]
                    .filter(Boolean)
                    .map((c) => ({ node: c, baseY: c.position.y, baseZ: c.position.z }))
                : [],
          });
        }
      });

      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const assigned = MAT_BY_NODE[child.name] || MAT_BY_NODE[child.parent?.name];
          if (assigned) {
            child.material = assigned;
          }
        }
      });

      modelRoot.add(tree);
    };

    attachNamesToLayerList(createStrataFallback());

    const loader = new GLTFLoader();
    let active = true;
    loader.load(
      '/models/pavement_strata.glb',
      (gltf) => {
        if (!active || !gltf?.scene) return;
        attachNamesToLayerList(gltf.scene);
        setModelReady(true);
      },
      undefined,
      () => {
        // Retain procedural fallback
      }
    );

    const updateSelectionVisuals = (selIdx, isExploded) => {
      const dur = prefersReduced ? 0 : 0.48;
      STRATUM_ORDER.forEach((_, idx) => {
        const sepStep = isExploded ? 0.28 : 0.08;
        const targetY = (2 - idx) * sepStep + (idx < selIdx ? 0.14 : 0);
        const targetZ = idx === selIdx ? 0.26 : 0;

        gsap.to(offsetsY, {
          [idx]: targetY,
          duration: dur,
          ease: 'power3.out',
        });
        gsap.to(offsetsZ, {
          [idx]: targetZ,
          duration: dur,
          ease: 'power3.out',
        });
      });

      const found = layerNodes.find((l) => l.idx === selIdx);
      if (found) {
        const sepStep = isExploded ? 0.28 : 0.08;
        const yVal = found.baseY + (2 - selIdx) * sepStep;
        gsap.to(highlightMesh.position, {
          y: yVal,
          z: 0.26,
          duration: dur,
          ease: 'power3.out',
        });
        gsap.to(highlightShaderMat.uniforms.uOpacity, {
          value: 0.9,
          duration: 0.25,
          onComplete: () => {
            gsap.to(highlightShaderMat.uniforms.uOpacity, {
              value: 0.42,
              duration: 0.5,
            });
          },
        });
      }
    };

    apiRef.current = { updateSelectionVisuals };
    updateSelectionVisuals(activeIndex, exploded);

    // Drag-to-orbit and Raycaster click to pick any pavement stratum directly
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const orbit = { dragging: false, moved: false, startX: 0, yaw: 0.0, targetYaw: 0.0 };

    const onDown = (e) => {
      orbit.dragging = true;
      orbit.moved = false;
      orbit.startX = e.clientX;
    };
    const onMove = (e) => {
      if (!orbit.dragging) return;
      const dx = e.clientX - orbit.startX;
      if (Math.abs(dx) > 4) orbit.moved = true;
      orbit.targetYaw += dx * 0.008;
      orbit.startX = e.clientX;
    };
    const onUp = (e) => {
      if (orbit.dragging && !orbit.moved) {
        const rect = host.getBoundingClientRect();
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObjects(modelRoot.children, true);
        if (hits.length > 0) {
          let curr = hits[0].object;
          while (curr && !STRATUM_ORDER.some((s) => s.name === curr.name)) {
            curr = curr.parent;
          }
          const matched = curr && STRATUM_ORDER.find((s) => s.name === curr.name);
          if (matched && onSelectRef.current) {
            onSelectRef.current(matched.idx);
          }
        }
      }
      orbit.dragging = false;
    };

    host.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    let isInViewport = true;
    let rafId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!active || !isInViewport) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(tick);
      const t = clock.elapsedTime;

      orbit.yaw += (orbit.targetYaw - orbit.yaw) * 0.08;
      const sway = prefersReduced ? 0 : Math.sin(t * 0.45) * 0.14;
      pivot.rotation.y = sway + orbit.yaw;

      layerNodes.forEach((item) => {
        item.node.position.y = item.baseY + offsetsY[item.idx];
        item.node.position.z = item.baseZ + offsetsZ[item.idx];
        item.companions.forEach((comp) => {
          comp.node.position.y = comp.baseY + offsetsY[item.idx];
          comp.node.position.z = comp.baseZ + offsetsZ[item.idx];
        });
      });

      highlightShaderMat.uniforms.uTime.value = t;
      camera.lookAt(0, -0.05, 0);
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!rafId && active && isInViewport) {
        tick();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0]?.isIntersecting ?? true;
        if (isInViewport) {
          startLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(host);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width || 440;
      const h = entry.contentRect.height || 290;
      const scale = getStrataFitScale(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2));
      camera.fov = getStrataFov(w);
      camera.aspect = w / h;
      camera.position.set(5.9 * scale, 3.8 * scale, 5.9 * scale);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    startLoop();

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      Object.values(matPacks).forEach((p) => p.dispose());
      markMat.dispose();
      highlightShaderMat.dispose();
      envRT.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.updateSelectionVisuals(activeIndex, exploded);
    }
  }, [activeIndex, exploded]);

  return (
    <div className="pavement-diagram-box">
      {webglReady ? (
        <div
          ref={hostRef}
          className="pavement-3d-canvas"
          aria-label="Interactive 3D Pavement Structural Cross-Section"
          title="Drag to rotate or click any layer to inspect"
        />
      ) : (
        <img
          src="/images/pavement-strata-diagram.png"
          alt="Multi-layer highway pavement structural cross-section"
          className="pavement-diagram-img"
        />
      )}
      <div className="pavement-diagram-caption pavement-diagram-caption--interactive">
        <span>
          {modelReady ? 'Blender 3D Cross-Section' : '3D Structural Cross-Section'} | Drag or
          Click Layer
        </span>
        <button
          type="button"
          className={`pavement-explode-btn ${exploded ? 'is-active' : ''}`}
          onClick={() => setExploded((v) => !v)}
        >
          {exploded ? 'Collapse Stack' : 'Explode Stack'}
        </button>
      </div>
    </div>
  );
}
