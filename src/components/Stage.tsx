import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Player } from './Player'
import { WaterPlane } from './WaterPlane'
import { Vector3 } from 'three'

export function Stage({ oxygenPosition }: { oxygenPosition: Vector3 }) {
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

  oxygenModel.scale.set(1.2, 1.2, 1.2)
  oxygenModel.rotation.set(Math.PI / 2, 0, Math.PI / 2)

  // const { scene: rockSea } = useGLTF('/rock-sea.glb')

  // rockSea.scale.set(40, 40, 40)

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
        position={oxygenPosition}
        key="oxygen"
      />

      {/* <primitive
        object={rockSea.clone()}
        position={new Vector3(20, -29, -150)}
        key="rock-sea"
      /> */}
    </>
  )
}

useGLTF.preload('https://roman1510.github.io/files/seaweed.glb')
