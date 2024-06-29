import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { Seaweed2 } from './Seaweed2';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function Seaweed2s({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/seaweed1.glb'
  );

  const geometry = (nodes.defaultMaterial as Mesh).geometry;

  const { defaultMat } = materials;

  const seaweed1Instances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 900;
      const z = (Math.random() - 0.5) * 900;
      const y = Math.random() * 1 - 29.5;
      const position = new Vector3(x, y, z);
      const rotationY = Math.random() * Math.PI;
      const scaleX = Math.random() * 0.3 + 0.3;
      const scaleY = 0.8;
      const scaleZ = Math.random() * 0.3 + 0.3;
      const scale = new Vector3(scaleX, scaleY, scaleZ);
      return (
        <Seaweed2
          key={i}
          position={position}
          rotation={[0, rotationY, 0]}
          scale={scale}
        />
      );
    });
  }, [range]);

  return (
    <Instances range={range} geometry={geometry} material={defaultMat}>
      {seaweed1Instances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/seaweed1.glb');
