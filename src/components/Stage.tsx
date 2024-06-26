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

  const { scene: seaweedModel } = useGLTF(
    'https://roman1510.github.io/files/seaweed.glb'
  )

  seaweedModel.scale.set(5, 5, 5)

  const { scene: oxygenModel } = useGLTF(
    'https://roman1510.github.io/files/oxygen.glb'
  )

  oxygenModel.scale.set(0.7, 0.7, 0.7)
  oxygenModel.rotation.set(Math.PI / 2, 0, Math.PI / 2)

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

      <primitive
        object={oxygenModel.clone()}
        position={new Vector3(0, -29, -150)}
        key="oxygen"
      />
    </>
  )
}

useGLTF.preload('https://roman1510.github.io/files/seaweed.glb')
