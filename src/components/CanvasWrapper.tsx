import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Loading } from './Loading';

import { Color, FogExp2 } from 'three';
import { Scene } from './Scene';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

export function CanvasWrapper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div
      style={{
        width: '97vw',
        height: '98vh',
      }}
    >
      <Canvas
        key="canvas-game"
        dpr={0.5}
        camera={{ fov: 30 }}
        onCreated={({ scene }) => {
          scene.background = new Color(0x000000);
          scene.fog = new FogExp2(0x000000, 0.002);
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          autoClear: true,
        }}
      >
        <Suspense fallback={<Loading />}>
          <Scene key="scene-game" canvasRef={canvasRef} />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
