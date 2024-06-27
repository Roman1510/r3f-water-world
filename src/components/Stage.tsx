import { useGLTF } from '@react-three/drei';
import { Player } from './Player';
import { WaterPlane } from './WaterPlane';
import { Vector3 } from 'three';
import { Seaweeds } from './Seaweeds/Seaweeds';

export function Stage({ oxygenPosition }: { oxygenPosition: Vector3 }) {
  const { scene: oxygenModel } = useGLTF(
    'https://roman1510.github.io/files/oxygen.glb'
  );

  oxygenModel.scale.set(1.2, 1.2, 1.2);
  oxygenModel.rotation.set(Math.PI / 2, 0, Math.PI / 2);

  return (
    <>
      <Player />
      <WaterPlane />

      <primitive
        object={oxygenModel.clone()}
        position={oxygenPosition}
        key="oxygen"
      />
      <Seaweeds range={7000} />
    </>
  );
}

useGLTF.preload('https://roman1510.github.io/files/seaweed.glb');
