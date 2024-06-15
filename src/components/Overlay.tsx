import { useGame } from '../hooks/useGame'
import { StartGame } from './StartGame'

const Overlay = () => {
  const { pause } = useGame()
  return <>{pause && <StartGame title="To play just click on that" />}</>
}

export default Overlay
