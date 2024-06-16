import { useEffect, useState } from 'react'
import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { MutableRefObject } from 'react'
import { Stage } from './Stage'
import { keyboardControls } from '../const/keyboardControls'
import { useGame } from '../hooks/useGame'
import {
  // ChromaticAberration,
  EffectComposer,
  Noise,
} from '@react-three/postprocessing' // Import the required components
import { BlendFunction } from 'postprocessing'
// import { Vector2 } from 'three'

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
  // const offset: Vector2 = new Vector2(0.01, 0.02)
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
          // setReady(false);
          // setPause(true);
        }}
      />
      {ready && (
        <EffectComposer>
          <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.1} />
          {/* <ChromaticAberration
            blendFunction={BlendFunction.SOFT_LIGHT}
            offset={offset}
            radialModulation={false}
            modulationOffset={0.001}
          /> */}
        </EffectComposer>
      )}
    </>
  )
}
