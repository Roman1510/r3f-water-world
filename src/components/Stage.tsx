import { Player } from './Player'
import { WaterPlane } from './WaterPlane'
import { Float } from '@react-three/drei'

export function Stage() {
  const numBoxes = 1000
  const planeScale = 2000

  // Generate random floating boxes positions
  const floatingBoxesPositions: [number, number, number][] = []
  for (let i = 0; i < numBoxes; i++) {
    const x = (Math.random() - 0.5) * planeScale
    const z = (Math.random() - 0.5) * planeScale
    const y = Math.random() * 3 // Adjust Y range as needed
    floatingBoxesPositions.push([x, y, z])
  }

  return (
    <>
      <Player />
      <WaterPlane />

      {/* Render floating boxes */}
      {floatingBoxesPositions.map((position, index) => (
        <Float key={index} position={position}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" /> {/* Adjust color as needed */}
          </mesh>
        </Float>
      ))}
    </>
  )
}
