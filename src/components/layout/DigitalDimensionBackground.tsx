'use client';

import { useEffect, useRef, useState, memo } from 'react';
import * as THREE from 'three';

/**
 * ALVIN — DIGITAL DIMENSION
 * Master Global Live 3D Background System for Alvin MS Portfolio
 * 
 * Features:
 * - Single persistent WebGL Canvas renderer mounted at the root layout.
 * - Coordinated 3D Wireframe Geometries (Icosahedron + Octahedron + Coordinate Orbit).
 * - Connected 3D Particle Constellation with real-time dynamic line connections.
 * - Moving technical coordinate grid with depth & perspective.
 * - Section-Aware Atmosphere Transitions:
 *     * Hero: Geometric forms, multi-colored particles & ambient lighting
 *     * About: Soft atmospheric particles & connected nodes
 *     * Ventures: Product-oriented connections & network structures
 *     * Skills: Technical grid & technology nodes
 *     * Projects: Constellation geometry & vibrant project accents
 *     * GitHub: Activity-inspired purple/emerald node connectivity
 *     * Contact: Minimal ambient particles & soft lighting
 * - Smooth lerped pointer-responsive parallax.
 * - Automatic WebGL fallback to lightweight CSS/Canvas mesh.
 * - Accessible: Respects prefers-reduced-motion and document.hidden throttling.
 */

type SectionType = 'hero' | 'about' | 'ventures' | 'skills' | 'projects' | 'github' | 'contact';

interface SectionAtmosphere {
  name: string;
  primaryColor: number;
  secondaryColor: number;
  lineColor: number;
  geometryScale: number;
  geometryOpacity: number;
  particleSpeed: number;
  gridOpacity: number;
}

const SECTION_CONFIGS: Record<SectionType, SectionAtmosphere> = {
  hero: {
    name: 'ENGINEERING UNIVERSE',
    primaryColor: 0x10b981,   // Emerald
    secondaryColor: 0x06b6d4, // Cyan
    lineColor: 0x34d399,
    geometryScale: 1.0,
    geometryOpacity: 0.22,
    particleSpeed: 1.0,
    gridOpacity: 0.12,
  },
  about: {
    name: 'NEURAL FOUNDATION',
    primaryColor: 0x06b6d4,   // Cyan
    secondaryColor: 0x10b981, // Emerald
    lineColor: 0x22d3ee,
    geometryScale: 0.75,
    geometryOpacity: 0.14,
    particleSpeed: 0.7,
    gridOpacity: 0.08,
  },
  ventures: {
    name: 'VENTURE ARCHITECTURE',
    primaryColor: 0xa855f7,   // Violet
    secondaryColor: 0x38bdf8, // Sky
    lineColor: 0xc084fc,
    geometryScale: 1.25,
    geometryOpacity: 0.24,
    particleSpeed: 1.1,
    gridOpacity: 0.14,
  },
  skills: {
    name: 'SYSTEM MATRIX',
    primaryColor: 0x84cc16,   // Lime
    secondaryColor: 0x06b6d4, // Cyan
    lineColor: 0xa3e635,
    geometryScale: 0.85,
    geometryOpacity: 0.18,
    particleSpeed: 0.9,
    gridOpacity: 0.16,
  },
  projects: {
    name: 'PRODUCTION CONSTELLATION',
    primaryColor: 0xf59e0b,   // Amber
    secondaryColor: 0x10b981, // Emerald
    lineColor: 0xfbbf24,
    geometryScale: 1.15,
    geometryOpacity: 0.22,
    particleSpeed: 1.0,
    gridOpacity: 0.12,
  },
  github: {
    name: 'OCTOCAT REPOSITORY MESH',
    primaryColor: 0x8b5cf6,   // Purple
    secondaryColor: 0x10b981, // Emerald
    lineColor: 0xa78bfa,
    geometryScale: 1.05,
    geometryOpacity: 0.25,
    particleSpeed: 1.2,
    gridOpacity: 0.15,
  },
  contact: {
    name: 'TRANSMISSION GATE',
    primaryColor: 0x14b8a6,   // Teal
    secondaryColor: 0x64748b, // Slate
    lineColor: 0x2dd4bf,
    geometryScale: 0.6,
    geometryOpacity: 0.09,
    particleSpeed: 0.5,
    gridOpacity: 0.06,
  },
};

function DigitalDimensionBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [useFallback, setUseFallback] = useState(false);

  // Section Observer to detect current scroll position smoothly
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections: { id: string; type: SectionType }[] = [
      { id: 'home', type: 'hero' },
      { id: 'about', type: 'about' },
      { id: 'ventures', type: 'ventures' },
      { id: 'skills', type: 'skills' },
      { id: 'projects', type: 'projects' },
      { id: 'github', type: 'github' },
      { id: 'contact', type: 'contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const match = sections.find((s) => s.id === visible[0].target.id);
          if (match) {
            setActiveSection(match.type);
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // WebGL Three.js persistent engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setUseFallback(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animFrameId: number | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false, // Performance: no heavy MSAA for ambient background
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
    } catch (e) {
      console.warn('WebGL context initialization failed, falling back to CSS/Canvas:', e);
      setUseFallback(true);
      return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    // 1. Core Rotating Wireframe Geometries
    const wireframeGroup = new THREE.Group();
    scene.add(wireframeGroup);

    // Outer Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(6.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    wireframeGroup.add(icoMesh);

    // Inner Octahedron (counter-rotating)
    const octGeom = new THREE.OctahedronGeometry(4.2, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const octMesh = new THREE.Mesh(octGeom, octMat);
    wireframeGroup.add(octMesh);

    // Coordinate Orbit Ring
    const ringGeom = new THREE.TorusGeometry(8.5, 0.04, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    wireframeGroup.add(ringMesh);

    // Shift wireframe group slightly to the right side on wide screens to complement left hero copy
    wireframeGroup.position.set(window.innerWidth > 1024 ? 4.5 : 0, 0, 0);

    // 2. 3D Floating Particle Cloud & Network
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 32 : 64;

    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle sprite using canvas
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      pCtx.beginPath();
      pCtx.arc(8, 8, 7, 0, Math.PI * 2);
      pCtx.fillStyle = '#ffffff';
      pCtx.fill();
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.45 : 0.6,
      map: pTexture,
      transparent: true,
      opacity: 0.65,
      color: 0x34d399,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Dynamic Connection Lines between particles
    const maxConnections = isMobile ? 40 : 90;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lineSegments);

    // 3. Technical Coordinate Plane Grid (Bottom subtle perspective floor)
    const gridHelper = new THREE.GridHelper(60, 30, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -12;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.12;
    scene.add(gridHelper);

    // Mouse Tracking for Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      wireframeGroup.position.set(w > 1024 ? 4.5 : 0, 0, 0);
    };
    window.addEventListener('resize', handleResize);

    // Current interpolation state for Section Atmosphere transitions
    let currentPrimaryColor = new THREE.Color(0x10b981);
    let currentSecondaryColor = new THREE.Color(0x06b6d4);
    let currentScale = 1.0;
    let currentOpacity = 0.22;
    let currentSpeed = 1.0;
    let currentGridOpacity = 0.12;

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Master Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isDocumentVisible || !renderer || !scene || !camera) return;

      const delta = clock.getDelta();
      const config = SECTION_CONFIGS[activeSection] || SECTION_CONFIGS.hero;

      // Smoothly interpolate section atmospheric parameters
      const lerpSpeed = delta * 2.5;
      currentPrimaryColor.lerp(new THREE.Color(config.primaryColor), lerpSpeed);
      currentSecondaryColor.lerp(new THREE.Color(config.secondaryColor), lerpSpeed);
      currentScale += (config.geometryScale - currentScale) * lerpSpeed;
      currentOpacity += (config.geometryOpacity - currentOpacity) * lerpSpeed;
      currentSpeed += (config.particleSpeed - currentSpeed) * lerpSpeed;
      currentGridOpacity += (config.gridOpacity - currentGridOpacity) * lerpSpeed;

      // Update materials
      icoMat.color.copy(currentPrimaryColor);
      icoMat.opacity = currentOpacity;
      octMat.color.copy(currentSecondaryColor);
      octMat.opacity = currentOpacity * 1.1;
      lineMat.color.copy(currentPrimaryColor);
      particleMat.color.copy(currentSecondaryColor);
      (gridHelper.material as THREE.Material).opacity = currentGridOpacity;

      // Smooth mouse parallax interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Rotate 3D Geometries
      const rotDelta = delta * 0.4 * currentSpeed;
      icoMesh.rotation.x += rotDelta;
      icoMesh.rotation.y += rotDelta * 0.7;
      octMesh.rotation.x -= rotDelta * 1.2;
      octMesh.rotation.y -= rotDelta * 0.9;
      ringMesh.rotation.z += rotDelta * 0.3;

      wireframeGroup.scale.set(currentScale, currentScale, currentScale);
      wireframeGroup.rotation.x = currentMouseY * 0.15;
      wireframeGroup.rotation.y = currentMouseX * 0.25;

      // Camera parallax
      camera.position.x = currentMouseX * 1.5;
      camera.position.y = -currentMouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Move 3D Particles
      const posAttr = particleGeom.getAttribute('position') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      let lineIndex = 0;
      const linePosAttr = lineGeom.getAttribute('position') as THREE.BufferAttribute;
      const linePosArr = linePosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        posArr[idx] += velocities[i].x * currentSpeed;
        posArr[idx + 1] += velocities[i].y * currentSpeed;
        posArr[idx + 2] += velocities[i].z * currentSpeed;

        // Boundary bounce
        if (Math.abs(posArr[idx]) > 24) velocities[i].x *= -1;
        if (Math.abs(posArr[idx + 1]) > 18) velocities[i].y *= -1;
        if (Math.abs(posArr[idx + 2]) > 12) velocities[i].z *= -1;

        // Check distance to other particles for connection lines
        if (lineIndex < maxConnections) {
          for (let j = i + 1; j < particleCount && lineIndex < maxConnections; j++) {
            const jdx = j * 3;
            const dx = posArr[idx] - posArr[jdx];
            const dy = posArr[idx + 1] - posArr[jdx + 1];
            const dz = posArr[idx + 2] - posArr[jdx + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 48) {
              const lIdx = lineIndex * 6;
              linePosArr[lIdx] = posArr[idx];
              linePosArr[lIdx + 1] = posArr[idx + 1];
              linePosArr[lIdx + 2] = posArr[idx + 2];
              linePosArr[lIdx + 3] = posArr[jdx];
              linePosArr[lIdx + 4] = posArr[jdx + 1];
              linePosArr[lIdx + 5] = posArr[jdx + 2];
              lineIndex++;
            }
          }
        }
      }

      // Clear remaining line vertices
      for (let k = lineIndex * 6; k < maxConnections * 6; k++) {
        linePosArr[k] = 0;
      }

      posAttr.needsUpdate = true;
      linePosAttr.needsUpdate = true;

      // Slow drift grid
      gridHelper.position.z = ((clock.getElapsedTime() * 1.5 * currentSpeed) % 2) - 1;

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup Three.js memory allocations
      icoGeom.dispose();
      icoMat.dispose();
      octGeom.dispose();
      octMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      pTexture.dispose();
      gridHelper.dispose();
      renderer?.dispose();
    };
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden max-w-full"
      aria-hidden="true"
    >
      {/* Three.js Persistent 3D WebGL Canvas */}
      {!useFallback && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-85 transition-opacity duration-1000"
        />
      )}

      {/* Lightweight CSS Animated Mesh Fallback (Active when WebGL fails or reduced-motion is requested) */}
      {useFallback && (
        <div
          className="absolute inset-0 w-full h-full animate-mesh-drift opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), ' +
              'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), ' +
              'radial-gradient(circle at 50% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 55%)',
          }}
        />
      )}

      {/* Global Ambient Glow Orbs with Subtle Atmosphere Drift */}
      <div className="absolute top-1/4 -left-20 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-emerald-500/8 blur-[110px] pointer-events-none animate-orb-1" />
      <div className="absolute top-1/3 -right-20 w-72 sm:w-[480px] h-72 sm:h-[480px] rounded-full bg-cyan-500/8 blur-[110px] pointer-events-none animate-orb-2" />
      <div className="absolute bottom-1/4 left-1/3 w-80 sm:w-[520px] h-80 sm:h-[520px] rounded-full bg-purple-600/7 blur-[120px] pointer-events-none animate-orb-3" />

      {/* Persistent Subtle Coordinate Technical Grid Mask */}
      <div
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), ' +
            'linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        }}
      />
    </div>
  );
}

export default memo(DigitalDimensionBackground);
