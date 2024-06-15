import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export const WaterPlane: React.FC = () => {
  const texture = useLoader(THREE.TextureLoader, '/sand.jpg')
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(16, 16)

  const roughnessMap = useLoader(THREE.TextureLoader, '/sand_rough.jpg')
  roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping
  roughnessMap.repeat.set(16, 16)

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider position={[0, 0, 0]} args={[2500, 2, 2500]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -30, 0]}>
          <planeGeometry args={[5000, 5000]} />
          <meshStandardMaterial map={texture} roughnessMap={roughnessMap} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  )
}
