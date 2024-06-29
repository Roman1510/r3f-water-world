import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { SeaRock } from './SeaRock';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function SeaRocks({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/rock1.glb'
  );

  const geometry = (nodes.Object_2 as Mesh).geometry;
  const material = materials['Scene_-_Root'];

  const seaUrchinInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 1500;
      const z = (Math.random() - 0.5) * 1500;
      const y = Math.random() * 1 - 31.5;
      const position = new Vector3(x, y, z);

      const rotationY = Math.random() * Math.PI;

      const scaleFactor = Math.random() * 3 + 1;
      const scale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

      return (
        <SeaRock
          key={i}
          position={position}
          rotation={[0, rotationY, 0]}
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

useGLTF.preload('https://roman1510.github.io/files/rock1.glb');
