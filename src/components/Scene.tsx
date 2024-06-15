import { useState, useRef } from 'react'
import { Html, KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { Loading } from './Loading'
import { Stage } from './Stage'
import { Color, FogExp2 } from 'three'
import { StartGame } from './StartGame'

export function Scene() {
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const keyboardControls = [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
    { name: 'dash', keys: ['Space'] },
  ]

  const handleStartGame = () => {
    setReady(true)
    setPaused(false)
  }

  return (
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
        {ready && (
          <Physics gravity={[0, -4, 0]}>
            <KeyboardControls map={keyboardControls}>
              <Stage />
            </KeyboardControls>
          </Physics>
        )}
        <Html>
          {(!ready || paused) && (
            <StartGame
              title={
                paused
                  ? 'You can continue of course, just click on the screen.'
                  : 'You can start under the sea experience right now, but you have to click on the screen.'
              }
            />
          )}
        </Html>
        <PointerLockControls
          domElement={canvasRef.current!}
          onLock={() => {
            console.log('lock')
            setPaused(false)
            handleStartGame()
          }}
          onUnlock={() => {
            console.log('unlock')
            setPaused(true)
            setReady(false)
          }}
        />
      </Suspense>
    </Canvas>
  )
}
