import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Player } from './Player'
import { WaterPlane } from './WaterPlane'
import { Vector3 } from 'three'

export function Stage() {
  const numSeaweeds = 2000
  const planeScale = 4000

  // Generate random floating seaweed positions
  const seaweedPositions = useMemo(() => {
    return Array.from({ length: numSeaweeds }, () => {
      const x = (Math.random() - 0.5) * planeScale
      const z = (Math.random() - 0.5) * planeScale
      const y = Math.random() * 1 - 25.5 // Adjust Y range as needed
      return new Vector3(x, y, z)
    })
  }, [numSeaweeds, planeScale])

  // Load the seaweed model
  const { scene: seaweedModel } = useGLTF('/new-seaweed.glb')

  // Apply scaling
  seaweedModel.scale.set(5, 5, 5)

  return (
    <>
      <Player />
      <WaterPlane />

      {seaweedPositions.map((position, index) => (
        <primitive
          object={seaweedModel.clone()}
          position={position}
          key={index}
        />
      ))}
    </>
  )
}

// This line is needed to avoid warnings about missing GLTF loader.
// If you have a custom loader, replace the path with your loader's path.
useGLTF.preload('/new-seaweed.glb')
