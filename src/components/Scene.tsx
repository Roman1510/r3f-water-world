import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useEffect, useRef } from 'react'
import { Loading } from './Loading'
import { Stage } from './Stage'
import { Color, FogExp2 } from 'three'

export function Scene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handlePointerDown = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.requestPointerLock()
      }
    }

    const canvasElement = canvasRef.current
    if (canvasElement) {
      canvasElement.addEventListener('pointerdown', handlePointerDown)
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('pointerdown', handlePointerDown)
      }
    }
  }, [])

  const keyboardControls = [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
    { name: 'dash', keys: ['Space'] },
  ]

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        ref={canvasRef}
        camera={{ fov: 40 }}
        onCreated={({ scene }) => {
          scene.background = new Color(0x000000)
          scene.fog = new FogExp2(0x000000, 0.0015)
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          depth: false,
          alpha: false,
        }}
      >
        <Suspense fallback={<Loading />}>
          <Physics gravity={[0, -1, 0]}>
            <KeyboardControls map={keyboardControls}>
              <Stage />
            </KeyboardControls>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
