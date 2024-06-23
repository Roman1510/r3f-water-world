import { Leva } from 'leva'
import { CanvasWrapper } from './components/CanvasWrapper'
import Overlay from './components/Overlay'
import { GameProvider } from './context/GameProvider'

export function App() {
  return (
    <>
      <GameProvider>
        <Overlay />
        <CanvasWrapper />
        <Leva />
      </GameProvider>
    </>
  )
}
