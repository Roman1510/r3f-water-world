import { Instances, useGLTF, Merged } from '@react-three/drei';
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Vector3,
} from 'three';
import { SeaUrchin } from './SeaUrchin';
import { useMemo } from 'react';

interface SeaUrchinsProps {
  range: number;
}

export function SeaUrchins({ range = 50 }: SeaUrchinsProps) {
  const { nodes, materials } = useGLTF(
    'https://roman1510.github.io/files/sea-urchin.glb'
  );
  console.log('nodes', nodes);

  const meshes = {
    LODPurpleSeaUrchinSkinMat: nodes.LOD0_PurpleSeaUrchinSkin_Mat_0 as Mesh,
    LODPurpleSeaUrchinSpineSkinMat:
      nodes.LOD0_PurpleSeaUrchinSpine_Skin_Mat_0 as Mesh,
    LODPurpleSeaUrchinSpineSkinMat1:
      nodes.LOD0_PurpleSeaUrchinSpine_Skin_Mat_0001 as Mesh,
    LODPurpleSeaUrchinSpineSkinMat2:
      nodes.LOD0_PurpleSeaUrchinSpine_Skin_Mat_0002 as Mesh,
    LODPurpleSeaUrchinSpineSkinMat3:
      nodes.LOD0_PurpleSeaUrchinSpine_Skin_Mat_0003 as Mesh,
  };

  const { PurpleSeaUrchinSpine_Skin_Mat } = materials;

  const scale = useMemo(() => new Vector3(4, 4, 4), []);

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
    <Merged meshes={meshes}>
      {(mergedMesh: {
        geometry: BufferGeometry<NormalBufferAttributes> | undefined;
        material: Material | Material[] | undefined;
      }) => {
        console.log(mergedMesh, 'mergedMesh');
        return (
          <Instances
            geometry={mergedMesh.geometry}
            material={PurpleSeaUrchinSpine_Skin_Mat}
          >
            {seaUrchinInstances}
          </Instances>
        );
      }}
    </Merged>
  );
}

useGLTF.preload('https://roman1510.github.io/files/sea-urchin.glb');
