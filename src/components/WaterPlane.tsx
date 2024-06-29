import { useLoader } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader } from 'three';

export const WaterPlane = () => {
  const texture = useLoader(TextureLoader, '/sand.jpg');
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(16, 16);

  const roughnessMap = useLoader(TextureLoader, '/sand_rough.jpg');
  roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;
  roughnessMap.repeat.set(16, 16);

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider position={[0, 0, 0]} args={[1250, 2, 1250]}>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -30, 0]}
        >
          <planeGeometry args={[2500, 2500]} />
          <meshPhysicalMaterial map={texture} roughnessMap={roughnessMap} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};
