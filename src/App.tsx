import { Leva } from 'leva';
import { CanvasWrapper } from './components/CanvasWrapper';
import Overlay from './components/Overlay';
import { GameProvider } from './context/GameProvider';

export function App() {
  return (
    <>
      <GameProvider>
        <Overlay />
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
