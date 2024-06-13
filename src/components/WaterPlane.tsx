import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

export const WaterPlane: React.FC = () => {
  const texture = useLoader(THREE.TextureLoader, '/sand.jpg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(16, 16)

  const roughnessMap = useLoader(THREE.TextureLoader, '/sand_rough.jpg')
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
  roughnessMap.repeat.set(16, 16)

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
      <planeGeometry args={[1000, 1000, 1600, 1600]} />
      <meshStandardMaterial map={texture} roughnessMap={roughnessMap} />
    </mesh>
  )
}
