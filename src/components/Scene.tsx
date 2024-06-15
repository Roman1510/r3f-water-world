import { useState, useRef, useEffect } from 'react'
import { Html, KeyboardControls } from '@react-three/drei'
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
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock()
      canvasRef.current.focus()
    }
  }

  useEffect(() => {
    const handlePointerLockChange = () => {
      console.log(document.pointerLockElement, 'pointerlockelement')
      const isLocked = document.pointerLockElement === null
      if (isLocked) {
        // setPaused(true)
      }
    }

    document.addEventListener('pointerlockchange', handlePointerLockChange)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
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
        onMouseDown={() => {
          if (!ready) {
            handleStartGame()
          }
        }}
      >
        <Suspense fallback={<Loading />}>
          {ready && !paused && (
            <Physics gravity={[0, -1, 0]}>
              <KeyboardControls map={keyboardControls}>
                <Stage />
              </KeyboardControls>
            </Physics>
          )}
          <Html>
            {(!ready || paused) && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <StartGame
                  title={
                    paused
                      ? 'You can continue of course, just click on the screen.'
                      : 'You can start under the sea experience right now, but you have to click on the screen.'
                  }
                />
              </div>
            )}
          </Html>
        </Suspense>
      </Canvas>
    </div>
  )
}
