import { useState } from 'react'
import { StartGame } from './components/StartGame'
import { Scene } from './components/Scene'

export function App() {
  const [start, setStart] = useState(false)
  return (
    <div className="canvas-wrapper">
      {!start && <StartGame setReady={setStart} />}
      {start && <Scene />}
    </div>
  )
}
