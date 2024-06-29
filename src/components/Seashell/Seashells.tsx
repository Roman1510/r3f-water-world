import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { Seashell } from './Seashell';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function Seashells({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/seashell.glb'
  );

  const geometry = (nodes.Object_2 as Mesh).geometry;

  const material = materials['Scene_-_Root'];

  const seashellInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 700;
      const z = (Math.random() - 0.5) * 700;
      const y = Math.random() * 1 - 30.5;
      const position = new Vector3(x + 17, y, z + 15);
      const rotationY = Math.random() * Math.PI;
      const scaleX = 0.15;
      const scaleY = 0.15;
      const scaleZ = 0.15;
      const scale = new Vector3(scaleX, scaleY, scaleZ);
      return (
        <Seashell
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
      {seashellInstances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/seashell.glb');
