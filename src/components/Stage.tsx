import { Player } from './Player';
import { WaterPlane } from './WaterPlane';
import { Vector3 } from 'three';
import { Seaweeds } from './Seaweeds/Seaweeds';
import { Oxygen } from './Oxygen/Oxygen';
import { SeaRocks } from './SeaRock/SeaRocks';
import { Seaweed2s } from './Seaweed2s/Seaweed2s';
import { SmallRocks } from './SmallRocks/SmallRocks';
import { Seashells } from './Seashell/Seashells';

export function Stage({ oxygenPosition }: { oxygenPosition: Vector3 }) {
  return (
    <>
      <Player />
      <WaterPlane />
      <Oxygen oxygenPosition={oxygenPosition} />
      <Seaweeds range={7000} />
      <Seaweed2s range={1500} />
      <SeaRocks range={100} />
      <SmallRocks range={700} />
      <Seashells range={4} />
    </>
  );
}
