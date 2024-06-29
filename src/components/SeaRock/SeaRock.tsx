import { Instance } from '@react-three/drei';
import { useRef } from 'react';

export function SeaRock({ ...props }) {
  const ref = useRef();

  return (
    <group {...props}>
      <Instance ref={ref} />
    </group>
  );
}
