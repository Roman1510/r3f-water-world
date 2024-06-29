import { Suspense } from 'react';
import { useGame } from '../hooks/useGame';
import { MaskOverlay } from './MaskOverlay';
import { StartGame } from './StartGame';
import useSounds from '../hooks/useSounds';

const Overlay = () => {
  const {
    pause,
    isLoaded,
    level,
    gameOver,
    oxygenIsClose,
    oxygenTaken,
    isDead,
  } = useGame();

  useSounds({ pause, gameOver, level });
  const title = isDead
    ? 'You miserably lost all your oxygen...'
    : `In the deepest ocean, there's no oxygen to waste... ${
        oxygenTaken ? 'And you did not waste it! Congratulations!' : ''
      }`;
  return (
    <Suspense>
      {pause && isLoaded ? (
        <StartGame
          title={title}
          instructions="Click on the screen to take control, and use [WASD] to move and [Space] for dash. To pick up oxygen use [E]"
          footer="This game contains sounds, be careful. Github: Roman1510"
        />
      ) : (
        <MaskOverlay />
      )}
      {oxygenIsClose && !pause && !gameOver && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '50px',
            height: '50px',
            backgroundColor: '#fff',
            zIndex: 999999,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 4px #999',
            fontWeight: 'bold',
            fontSize: '24px',
            color: '#333',
          }}
        >
          E
        </div>
      )}
    </Suspense>
  );
};

export default Overlay;
