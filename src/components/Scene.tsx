import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { Loading } from './Loading'
import { Player } from './Player'
import { Stage } from './Stage'
import { Color, FogExp2 } from 'three'

export function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          {
            name: 'right',
            keys: ['ArrowRight', 'd', 'D'],
          },
          { name: 'dash', keys: ['Space'] },
        ]}
      >
        <Canvas
          camera={{ fov: 30 }}
          onCreated={({ scene }) => {
            scene.background = new Color(0x000000)
            scene.fog = new FogExp2(0x000000, 0.01)
          }}
        >
          <Suspense fallback={<Loading />}>
            <Physics gravity={[0, -1, 0]}>
              <Player />
              <Stage />
              <RigidBody type="fixed" colliders={false}>
                <CuboidCollider position={[0, 0, 0]} args={[100, 2, 100]} />
              </RigidBody>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}