import { Leva } from 'leva';
import { CanvasWrapper } from './components/CanvasWrapper';
import Overlay from './components/Overlay';
import { GameProvider } from './context/GameProvider';
import { useProgress } from '@react-three/drei';

export function App() {
  const { loaded } = useProgress();
  return (
    <>
      <GameProvider>
        {loaded && <Overlay />}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <CanvasWrapper />
        </div>
        <Leva hidden collapsed />
      </GameProvider>
    </>
  );
}
