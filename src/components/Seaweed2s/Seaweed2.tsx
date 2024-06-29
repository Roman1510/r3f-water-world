import { Instance } from '@react-three/drei';
import { useRef } from 'react';

export function Seaweed2({ ...props }) {
  const ref = useRef();

  return (
    <group {...props}>
      <Instance ref={ref} />
    </group>
  );
}
