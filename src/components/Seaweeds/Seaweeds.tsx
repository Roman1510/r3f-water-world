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
  const mesh = nodes.TallSeaweed.children[0] as Mesh;

  const scale = useMemo(() => new Vector3(5, 5, 5), []);

  const seaweedInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 1500;
      const z = (Math.random() - 0.5) * 1500;
      const y = Math.random() * 1 - 25.5;
      const position = new Vector3(x, y, z);

      return <Seaweed key={i} position={position} scale={scale} />;
    });
  }, [range, scale]);

  return (
    <Instances
      range={range}
      material={materials.lambert1}
      geometry={mesh.geometry}
    >
      {seaweedInstances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/seaweed.glb');