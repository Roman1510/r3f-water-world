import { useEffect, useRef } from 'react'
import { useGame } from '../hooks/useGame'
import { MaskOverlay } from './MaskOverlay'
import { StartGame } from './StartGame'

const Overlay = () => {
  const { pause, level } = useGame()
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const beatRef = useRef<HTMLAudioElement | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const interactionRef = useRef(false)

  useEffect(() => {
    console.log('level', level)
  }, [level])

  useEffect(() => {
    const music = new Audio('/mainsound.mp3')
    const beat = new Audio('/heart1.mp3')

    music.preload = 'auto'
    beat.preload = 'auto'

    beat.loop = true
    music.loop = true

    musicRef.current = music
    beatRef.current = beat

    const handleInteraction = () => {
      if (!interactionRef.current) {
        interactionRef.current = true

        const audioContext = new window.AudioContext()
        audioContextRef.current = audioContext

        const source = audioContext.createMediaElementSource(music)
        const gainNode = audioContext.createGain()
        gainNode.gain.value = 0.2
        gainNodeRef.current = gainNode

        source.connect(gainNode).connect(audioContext.destination)

        audioContext.resume().then(() => {
          music.play().catch((error) => {
            console.error('Audio playback failed:', error)
          })
        })
      }
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const fadeVolume = (
      gainNode: GainNode,
      targetVolume: number,
      duration: number
    ) => {
      const currentTime = audioContextRef.current!.currentTime
      gainNode.gain.cancelScheduledValues(currentTime)
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime)
      gainNode.gain.linearRampToValueAtTime(
        targetVolume,
        currentTime + duration
      )
    }

    if (pause && gainNodeRef.current) {
      fadeVolume(gainNodeRef.current, 0, 0.3)
      setTimeout(() => {
        musicRef.current?.pause()
      }, 300)
    } else if (!pause && gainNodeRef.current && interactionRef.current) {
      musicRef.current?.play().catch((error) => {
        console.error('Audio playback failed:', error)
      })
      fadeVolume(gainNodeRef.current, 1, 0.3)

      beatRef.current?.play().catch((error) => {
        console.error('Audio playback failed:', error)
      })
    }
  }, [pause])

  return (
    <>
      {pause && (
        <StartGame
          title="You want to survive, just click on your screen. "
          instructions="Use [WASD] to move and [Space] for dash. To pick up oxygen use [E]"
          footer="This game contains sounds, be careful. Github: Roman1510"
        />
      )}
      {!pause && <MaskOverlay />}
    </>
  )
}

export default Overlay
