import { useState } from 'react'
import { Landing } from './components/Landing'
import { Scene } from './components/Scene'

export function App() {
  const [ready, setReady] = useState(false)
  return (
    <div className="canvas-wrapper">
      {!ready && <Landing setReady={setReady} />}
      {ready && <Scene />}
    </div>
  )
}
