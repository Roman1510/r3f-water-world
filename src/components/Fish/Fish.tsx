import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { gsap } from 'gsap';

type GLTFResult = GLTF & {
  nodes: {
    Object_0: THREE.Mesh;
    Object_0_1: THREE.Mesh;
    Object_0_2: THREE.Mesh;
    Object_0_3: THREE.Mesh;
    Object_0_4: THREE.Mesh;
  };
  materials: {
    initialShadingGroup: THREE.MeshStandardMaterial;
    bones_matSG: THREE.MeshStandardMaterial;
    Eyes_mat1SG: THREE.MeshStandardMaterial;
    skint_matSG: THREE.MeshStandardMaterial;
    teeth_matSG: THREE.MeshStandardMaterial;
  };
};

export function Fish(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/fish_-_deep_sea.glb'
  ) as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        z: -500,
        duration: 5,
        onComplete: () => {
          if (groupRef.current?.parent) {
            groupRef.current.parent.remove(groupRef.current);
            groupRef.current.traverse((child) => {
              if ((child as THREE.Mesh).geometry) {
                (child as THREE.Mesh).geometry.dispose();
              }
              if ((child as THREE.Mesh).material) {
                const material = (child as THREE.Mesh)
                  .material as THREE.Material;
                material.dispose();
              }
            });
          }
        },
      });
    }
  }, []);

  return (
    <group
      ref={groupRef}
      {...props}
      scale={5}
      position={[0, 0, -150]}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_0.geometry}
          material={materials.initialShadingGroup}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_0_1.geometry}
          material={materials.bones_matSG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_0_2.geometry}
          material={materials.Eyes_mat1SG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_0_3.geometry}
          material={materials.skint_matSG}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_0_4.geometry}
          material={materials.teeth_matSG}
        />
      </group>
    </group>
  );
}

useGLTF.preload('https://roman1510.github.io/files/fish_-_deep_sea.glb');
