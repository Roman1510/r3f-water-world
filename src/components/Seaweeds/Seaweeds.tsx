import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { Seaweed } from './Seaweed';
import { useMemo } from 'react';

interface SeaweedProps {
  range: number;
}

export function Seaweeds({ range = 100 }: SeaweedProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/seaweed.glb'
  );
  const { geometry } = nodes.TallSeaweed.children[0] as Mesh;
  const material = materials.lambert1;

  const seaweedInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 1250;
      const z = (Math.random() - 0.5) * 1250;
      const y = Math.random() * 1 - 27.5;
      const position = new Vector3(x, y, z);
      const rotationY = Math.random() * Math.PI;
      const scaleX = Math.random() * (6 - 1) + 1;
      const scaleY = 5.5;
      const scaleZ = Math.random() * (6 - 1) + 1;
      const scale = new Vector3(scaleX, scaleY, scaleZ);
      return (
        <Seaweed
          key={i}
          position={position}
          rotation={[0, rotationY, 0]}
          scale={scale}
        />
      );
    });
  }, [range]);

  return (
    <Instances range={range} material={material} geometry={geometry}>
      {seaweedInstances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/seaweed.glb');
