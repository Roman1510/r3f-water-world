import { useGame } from '../hooks/useGame'
import { MaskOverlay } from './MaskOverlay'
import { StartGame } from './StartGame'

const Overlay = () => {
  const { pause } = useGame()
  return (
    <>
      {pause && <StartGame title="To play just click on that" />}
      {!pause && <MaskOverlay />}
    </>
  )
}

export default Overlay
