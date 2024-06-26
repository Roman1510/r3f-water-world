import { useEffect, useState } from 'react'
import {
  Environment,
  KeyboardControls,
  PointerLockControls,
} from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { MutableRefObject } from 'react'
import { Stage } from './Stage'
import { keyboardControls } from '../const/keyboardControls'
import { useGame } from '../hooks/useGame'
import {
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
  WaterEffect,
} from '@react-three/postprocessing'
import { BlendFunction, ShaderPass } from 'postprocessing'
import { useControls } from 'leva'
import { Vector2 } from 'three'
import { extend } from '@react-three/fiber'

interface ISceneProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
}
extend({ ShaderPass })
export const Scene = ({ canvasRef }: ISceneProps) => {
  const handleStartGame = () => {
    setReady(true)
  }

  const [ready, setReady] = useState(false)
  const { setPause, level } = useGame()

  useEffect(() => {
    setPause(true)
  }, [setPause])

  const { focusDistance, focalLength, bokehScale, height } = useControls(
    'DepthOfField',
    {
      focusDistance: { value: 0.032, min: 0, max: 30, step: 0.01 },
      focalLength: { value: 0.16, min: 0, max: 1, step: 0.01 },
      bokehScale: { value: 10, min: 0, max: 10, step: 0.1 },
      height: { value: 800, min: 0, max: 1000, step: 10 },
    }
  )

  return (
    <>
      <Environment
        background={false}
        preset="night"
        environmentIntensity={0.025}
      />
      <Physics gravity={[0, -10, 0]}>
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
          setReady(false)
          setPause(true)
        }}
      />
      {ready && (
        <>
          <EffectComposer enableNormalPass={false} multisampling={4}>
            <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.4} />
            <Vignette eskil={false} offset={0.55} darkness={0.9} />
            <>
              {level === 4 && (
                <ChromaticAberration
                  blendFunction={BlendFunction.SOFT_LIGHT}
                  offset={new Vector2(0.02, 0.05)}
                  radialModulation={false}
                  modulationOffset={0.001}
                />
              )}
            </>
            <DepthOfField
              focusDistance={focusDistance}
              focalLength={focalLength}
              bokehScale={bokehScale}
              height={height}
            />
            <WaterEffect factor={0.63} />
          </EffectComposer>
        </>
      )}
    </>
  )
}
