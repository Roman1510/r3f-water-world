import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Loading } from './Loading'

import { Color, FogExp2 } from 'three'
import { Scene } from './Scene'

export function CanvasWrapper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ fov: 35 }}
        onCreated={({ scene }) => {
          scene.background = new Color(0x000000)
          scene.fog = new FogExp2(0x000000, 0.001)
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          alpha: false,
        }}
      >
        <Suspense fallback={<Loading />}>
          <Scene canvasRef={canvasRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
