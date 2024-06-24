import { useEffect, useRef, useState } from 'react'
import { useGame } from '../hooks/useGame'
import { MaskOverlay } from './MaskOverlay'
import { StartGame } from './StartGame'

const Overlay = () => {
  const { pause, level, gameOver } = useGame()
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const beatRef = useRef<HTMLAudioElement | null>(null)
  const breathRef = useRef<HTMLAudioElement | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const interactionRef = useRef(false)
  const [heartbeatStopped, setHeartbeatStopped] = useState(false)

  useEffect(() => {
    //repetitive code :D
    const music = new Audio('/mainsound.mp3')
    const beat = new Audio('/heart1.mp3')
    const breath = new Audio('/breath.mp3')

    music.preload = 'auto'
    beat.preload = 'auto'
    breath.preload = 'auto'

    music.loop = true
    beat.loop = true
    breath.loop = true

    musicRef.current = music
    beatRef.current = beat
    breathRef.current = breath

    const handleInteraction = () => {
      if (!interactionRef.current) {
        interactionRef.current = true

        const audioContext = new window.AudioContext()
        audioContextRef.current = audioContext

        const source = audioContext.createMediaElementSource(music)
        const gainNode = audioContext.createGain()
        gainNode.gain.value = 0.8
        gainNodeRef.current = gainNode

        source.connect(gainNode).connect(audioContext.destination)

        audioContext.resume().then(() => {
          music.play().catch((error) => {
            console.error('Music playback failed:', error)
          })

          beatRef.current?.play().catch((error) => {
            console.error('Heartbeat playback failed:', error)
          })

          breathRef.current?.play().catch((error) => {
            console.error('Breath playback failed:', error)
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
      if (beatRef.current) {
        beatRef.current.pause()
        beatRef.current = null
      }
      if (breathRef.current) {
        breathRef.current.pause()
        breathRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    console.log('level', level)
    if (level === 1 || level === 2) {
      beatRef.current!.src = '/heart1.mp3'
      breathRef.current!.src = '/breath1.mp3'
    } else if (level === 3) {
      beatRef.current!.src = '/heart2.mp3'
      breathRef.current!.src = '/breath2.mp3'
    } else if (level === 4 || level === 5) {
      beatRef.current!.src = '/heart3.mp3'
      breathRef.current!.src = '/breath3.mp3'
    }

    if (beatRef.current) {
      beatRef.current.pause()
      beatRef.current.currentTime = 0
      if (!heartbeatStopped && interactionRef.current) {
        beatRef.current.play().catch((error) => {
          console.error('Heartbeat playback failed:', error)
        })
      }
    }

    if (breathRef.current) {
      breathRef.current.pause()
      breathRef.current.currentTime = 0
      if (!heartbeatStopped && interactionRef.current) {
        breathRef.current.play().catch((error) => {
          console.error('Heartbeat playback failed:', error)
        })
      }
    }
  }, [level, heartbeatStopped])

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
        if (musicRef.current) {
          musicRef.current.pause()
          beatRef.current?.pause()
        }
      }, 300)
    } else if (!pause && gainNodeRef.current && interactionRef.current) {
      if (musicRef.current) {
        musicRef.current.play().catch((error) => {
          console.error('Music playback failed:', error)
        })
      }
      fadeVolume(gainNodeRef.current, 1, 0.3)

      if (!heartbeatStopped && beatRef.current) {
        beatRef.current.play().catch((error) => {
          console.error('Heartbeat playback failed:', error)
        })
      }
      if (!heartbeatStopped && breathRef.current) {
        breathRef.current.play().catch((error) => {
          console.error('Breath playback failed:', error)
        })
      }
    }
  }, [pause, heartbeatStopped])

  useEffect(() => {
    if (gameOver) {
      setHeartbeatStopped(true)
      if (beatRef.current) {
        beatRef.current.pause()
      }
      if (breathRef.current) {
        breathRef.current.pause()
      }
      if (musicRef.current) {
        musicRef.current.pause()
      }
    }
  }, [gameOver])

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
