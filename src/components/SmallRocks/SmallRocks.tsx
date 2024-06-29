import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { SmallRock } from './SmallRock';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function SmallRocks({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/small-rocks.glb'
  );

  const geometry = (nodes.Object_5 as Mesh).geometry;
  const { RockTex: material } = materials;

  const seaUrchinInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 1200;
      const z = (Math.random() - 0.5) * 1200;
      const y = Math.random() * 1 - 31.5;
      const position = new Vector3(x, y, z);

      const rotationY = Math.random() * Math.PI;

      const scaleFactor = Math.random() * 3 + 4.5;
      const scale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

      return (
        <SmallRock
          key={i}
          position={position}
          rotation={[-Math.PI / 2, rotationY, 0]}
          scale={scale}
        />
      );
    });
  }, [range]);

  return (
    <Instances range={range} geometry={geometry} material={material}>
      {seaUrchinInstances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/small-rocks.glb');
