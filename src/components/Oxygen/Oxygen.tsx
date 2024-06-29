import { useGLTF } from '@react-three/drei';

import { Vector3 } from 'three';

export function Oxygen({ oxygenPosition }: { oxygenPosition: Vector3 }) {
  const { scene: oxygenModel } = useGLTF(
    'https://roman1510.github.io/files/oxygen.glb'
  );

  oxygenModel.scale.set(2.2, 2.2, 2.2);
  oxygenModel.rotation.set(Math.PI / 2, 0, Math.PI / 2);

  return (
    <>
      <primitive
        object={oxygenModel.clone()}
        position={oxygenPosition}
        key="oxygen"
      />
    </>
  );
}

useGLTF.preload('https://roman1510.github.io/files/oxygen.glb');
