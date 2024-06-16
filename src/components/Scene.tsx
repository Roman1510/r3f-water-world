import { useEffect, useState } from 'react'
import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { MutableRefObject } from 'react'
import { Stage } from './Stage'
import { keyboardControls } from '../const/keyboardControls'
import { useGame } from '../hooks/useGame'

export const Scene: React.FC<{
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
}> = ({ canvasRef }) => {
  const handleStartGame = () => {
    setReady(true)
  }

  const [ready, setReady] = useState(false)
  const { setPause } = useGame()
  useEffect(() => {
    setPause(true)
  }, [setPause])
  return (
    <>
      <Physics gravity={[0, -4, 0]}>
        <KeyboardControls map={keyboardControls}>
          {ready ? <Stage /> : null}
        </KeyboardControls>
      </Physics>
      <PointerLockControls
        domElement={canvasRef.current!}
        onLock={() => {
          setReady(true)
          handleStartGame()
          setPause(false)
        }}
        onUnlock={() => {
          // setReady(false)
          // setPause(true)
        }}
      />
    </>
  )
}
