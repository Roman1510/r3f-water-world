import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Player } from './Player'
import { WaterPlane } from './WaterPlane'
import { Vector3 } from 'three'

export function Stage() {
  const numSeaweeds = 5000
  const planeScale = 4000

  const seaweedPositions = useMemo(() => {
    return Array.from({ length: numSeaweeds }, () => {
      const x = (Math.random() - 0.5) * planeScale
      const z = (Math.random() - 0.5) * planeScale
      const y = Math.random() * 1 - 25.5
      return new Vector3(x, y, z)
    })
  }, [numSeaweeds, planeScale])

  const { scene: seaweedModel } = useGLTF('/new-seaweed.glb')

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

useGLTF.preload('/new-seaweed.glb')
