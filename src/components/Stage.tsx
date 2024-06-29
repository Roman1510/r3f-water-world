import { Player } from './Player';
import { WaterPlane } from './WaterPlane';
import { Vector3 } from 'three';
import { Seaweeds } from './Seaweeds/Seaweeds';
import { Oxygen } from './Oxygen/Oxygen';
import { SeaRocks } from './SeaRock/SeaRocks';

export function Stage({ oxygenPosition }: { oxygenPosition: Vector3 }) {
  return (
    <>
      <Player />
      <WaterPlane />
      <Oxygen oxygenPosition={oxygenPosition} />
      <Seaweeds range={7000} />
      {/* <SeaUrchins range={50} /> */}
      <SeaRocks range={400} />
    </>
  );
}
