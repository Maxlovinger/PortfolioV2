"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* Sparse ambient particles */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const count = 70;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = -4 - Math.random() * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.003 + mouse.x * 0.018;
    ref.current.rotation.x = t * 0.002 + mouse.y * 0.010;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#CFDBD5" size={0.016} sizeAttenuation depthWrite={false} opacity={0.18} />
    </Points>
  );
}

/* Faint horizontal grid lines — chart background feel */
function ChartGrid() {
  const geom = useMemo(() => {
    const levels = 6;
    const verts: number[] = [];
    for (let i = 0; i < levels; i++) {
      const y = -1.5 + i * 0.65;
      verts.push(0, y, 0,  10, y, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geom} position={[0.8, -0.3, -5.5]}>
      <lineBasicMaterial color="#CFDBD5" transparent opacity={0.05} />
    </lineSegments>
  );
}

/* Candlestick chart — the centrepiece */
function Candles({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  /* Deterministic synthetic OHLC — realistic-looking price action */
  const candles = useMemo(() => {
    type Candle = { x: number; open: number; close: number; high: number; low: number; bull: boolean };
    const moves = [0.55, 0.28, -0.38, 0.72, 0.18, -0.31, 0.48, -0.22, 0.63, 0.09,
                   -0.44, 0.38, 0.61, -0.15, 0.27, -0.42, 0.76, 0.21, -0.35, 0.58, 0.33, -0.19, 0.45, 0.12];
    const wicks  = [0.18, 0.12, 0.22, 0.09, 0.15, 0.20, 0.11, 0.17, 0.08, 0.14,
                    0.19, 0.13, 0.10, 0.16, 0.21, 0.12, 0.09, 0.18, 0.14, 0.11, 0.20, 0.15, 0.13, 0.17];
    const out: Candle[] = [];
    let price = 0;
    for (let i = 0; i < moves.length; i++) {
      const body = moves[i] * 0.2;
      const open = price;
      const close = price + body;
      const high = Math.max(open, close) + wicks[i] * 0.5;
      const low  = Math.min(open, close) - wicks[(i + 4) % wicks.length] * 0.5;
      out.push({ x: i * 0.42, open, close, high, low, bull: close >= open });
      price = close;
    }
    return out;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.055) * 0.10;
    const fade = Math.max(0, 1 - scrollY * 0.0022);
    for (const child of groupRef.current.children) {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (mat && mat.opacity !== undefined) {
        mat.opacity = fade * ((child as any).__base ?? 0.2);
      }
    }
  });

  const elems: React.ReactElement[] = [];
  candles.forEach((c, i) => {
    const bodyH = Math.max(Math.abs(c.close - c.open), 0.04);
    const bodyY = (c.open + c.close) / 2;
    const wickH = c.high - c.low;
    const col   = c.bull ? "#CFDBD5" : "#3d4239";

    elems.push(
      <mesh key={`b${i}`} position={[c.x, bodyY, 0]}
        onUpdate={(s) => { (s as any).__base = 0.26; }}>
        <boxGeometry args={[0.26, bodyH, 0.01]} />
        <meshBasicMaterial color={col} transparent opacity={0.26} />
      </mesh>,
      <mesh key={`w${i}`} position={[c.x, (c.high + c.low) / 2, 0]}
        onUpdate={(s) => { (s as any).__base = 0.12; }}>
        <boxGeometry args={[0.028, wickH, 0.01]} />
        <meshBasicMaterial color={col} transparent opacity={0.12} />
      </mesh>
    );
  });

  return (
    <group ref={groupRef} position={[0.8, -0.5, -5.5]} rotation={[0, -0.06, 0]}>
      {elems}
    </group>
  );
}

/* Gold moving-average trend line */
function TrendLine({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 24; i++) {
      const x = i * 0.42;
      const y = Math.sin(i * 0.35) * 0.48 + Math.sin(i * 0.12) * 0.22 + i * 0.016;
      pts.push(new THREE.Vector3(x, y * 0.62, 0.01));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 100, 0.013, 4, false);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const fade = Math.max(0, 1 - scrollY * 0.0022);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      fade * (0.42 + Math.sin(t * 0.45) * 0.06);
    meshRef.current.position.y = Math.sin(t * 0.055) * 0.10;
  });

  return (
    <mesh ref={meshRef} geometry={geom} position={[0.8, -0.5, -5.3]}>
      <meshBasicMaterial color="#F5CB5C" transparent opacity={0.42} />
    </mesh>
  );
}

/* Volume bars along the bottom */
function VolumeBars({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const bars = useMemo(() => {
    const vols = [0.4, 0.6, 0.9, 0.5, 0.7, 0.3, 0.8, 0.6, 1.0, 0.4,
                  0.7, 0.5, 0.6, 0.8, 0.4, 0.9, 0.5, 0.7, 0.6, 0.3, 0.8, 0.5, 0.6, 0.4];
    return vols.map((v, i) => ({ x: i * 0.42, h: v * 0.28 }));
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const fade = Math.max(0, 1 - scrollY * 0.0022);
    for (const child of groupRef.current.children) {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (mat) mat.opacity = fade * 0.07;
    }
  });

  return (
    <group ref={groupRef} position={[0.8, -0.5, -5.6]}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, -1.5 + b.h / 2, 0]}>
          <boxGeometry args={[0.22, b.h, 0.01]} />
          <meshBasicMaterial color="#CFDBD5" transparent opacity={0.07} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ scrollY }: { scrollY: number }) {
  return (
    <>
      <Particles />
      <ChartGrid />
      <VolumeBars scrollY={scrollY} />
      <Candles scrollY={scrollY} />
      <TrendLine scrollY={scrollY} />
    </>
  );
}

export default function Background3D() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 56 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#242423" }}
        dpr={[1, 1.5]}
      >
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
