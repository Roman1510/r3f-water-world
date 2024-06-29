import { Instances, useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { SeaUrchin } from './SeaUrchin';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function SeaUrchins({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/sea-urchin.glb'
  );

  const geometry = (nodes.LOD0_PurpleSeaUrchinSkin_Mat_0 as Mesh).geometry;

  const { PurpleSeaUrchinSpine_Skin_Mat } = materials;

  const scale = useMemo(() => new Vector3(1, 1, 1), []);

  const seaUrchinInstances = useMemo(() => {
    return Array.from({ length: range }).map((_, i: number) => {
      const x = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      const y = Math.random() * 1 - 25.5;
      const position = new Vector3(x, y, z);

      return <SeaUrchin key={i} position={position} scale={scale} />;
    });
  }, [range, scale]);

  return (
    <Instances
      range={range}
      geometry={geometry}
      material={PurpleSeaUrchinSpine_Skin_Mat}
    >
      {seaUrchinInstances}
    </Instances>
  );
}

useGLTF.preload('https://roman1510.github.io/files/sea-urchin.glb');
