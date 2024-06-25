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
  WaterEffect,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import { Vector2 } from 'three'

export const Scene: React.FC<{
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
}> = ({ canvasRef }) => {
  const handleStartGame = () => {
    setReady(true)
  }

  const [ready, setReady] = useState(false)
  const { setPause, level } = useGame()
  const [chromaticOffset, setChromaticOffset] = useState(new Vector2(0, 0))

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

  useEffect(() => {
    let animationFrameId: number
    if (level === 2) {
      const targetOffset = new Vector2(0.01, 0.02)
      const duration = 200 // Duration of the transition in milliseconds
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const newOffset = new Vector2(
          targetOffset.x * progress,
          targetOffset.y * progress
        )
        setChromaticOffset(newOffset)
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    } else {
      setChromaticOffset(new Vector2(0, 0))
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [level])

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
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Noise blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.1} />
          <>
            {level === 2 && (
              <ChromaticAberration
                blendFunction={BlendFunction.SOFT_LIGHT}
                offset={chromaticOffset}
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
          <WaterEffect />
        </EffectComposer>
      )}
    </>
  )
}
