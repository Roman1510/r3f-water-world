import { Suspense } from 'react';
import { useGame } from '../hooks/useGame';
import { MaskOverlay } from './MaskOverlay';
import { StartGame } from './StartGame';
import useSounds from '../hooks/useSounds';

const Overlay = () => {
  const { pause, isLoaded, level, gameOver } = useGame();

  useSounds({ pause, gameOver, level });

  return (
    <Suspense>
      {pause && isLoaded ? (
        <StartGame
          title="In the deepest ocean, there's no oxygen to waste..."
          instructions="Click on the screen to take control, and use [WASD] to move and [Space] for dash. To pick up oxygen use [E]"
          footer="This game contains sounds, be careful. Github: Roman1510"
        />
      ) : (
        <MaskOverlay />
      )}
    </Suspense>
  );
};

export default Overlay;
