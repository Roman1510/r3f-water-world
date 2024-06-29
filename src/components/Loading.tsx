import { useEffect, useRef } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { gsap } from 'gsap';

export const Loading = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 13,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut',
      });
    }
  }, []);

  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        {progress} % loaded
        <img
          ref={imageRef}
          src="https://roman1510.github.io/files/monster-fish.PNG"
          alt="Loading Fish"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
    </Html>
  );
};
