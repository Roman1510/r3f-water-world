import { Player } from './Player'
import { WaterPlane } from './WaterPlane'
import { Instances, Instance } from '@react-three/drei'
import { Vector3 } from 'three'

export function Stage() {
  const numBoxes = 1000
  const planeScale = 2000

  // Generate random floating boxes positions
  const floatingBoxesPositions = Array.from({ length: numBoxes }, () => {
    const x = (Math.random() - 0.5) * planeScale
    const z = (Math.random() - 0.5) * planeScale
    const y = Math.random() * 1 - 8 // Adjust Y range as needed
    return new Vector3(x, y, z) // Convert to Vector3 object
  })

  return (
    <>
      <Player />
      <WaterPlane />

      <Instances limit={numBoxes}>
        {floatingBoxesPositions.map((position, index) => (
          <Instance key={index} position={position}>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="darkgrey" />
            </mesh>
          </Instance>
        ))}
      </Instances>
    </>
  )
}
