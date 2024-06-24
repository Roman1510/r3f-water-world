import { useEffect, useMemo, useRef, useState } from 'react'
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

  // Define levelAudioMap to map levels to audio sources
  const levelAudioMap = useMemo(
    () => ({
      1: { beat: '/heart1.mp3', breath: '/breath1.mp3' },
      2: { beat: '/heart1.mp3', breath: '/breath1.mp3' },
      3: { beat: '/heart2.mp3', breath: '/breath2.mp3' },
      4: { beat: '/heart3.mp3', breath: '/breath3.mp3' },
      5: { beat: '/heart3.mp3', breath: '/breath3.mp3' },
    }),
    []
  )

  // Initialize audio and setup interaction handling
  useEffect(() => {
    const initializeAudio = () => {
      const music = new Audio('/mainsound.mp3')
      const beat = new Audio(levelAudioMap[level]?.beat || '/heart1.mp3')
      const breath = new Audio(levelAudioMap[level]?.breath || '/breath1.mp3')

      music.preload = 'auto'
      beat.preload = 'auto'
      breath.preload = 'auto'

      music.loop = true
      beat.loop = true
      beat.volume = 0.5
      breath.loop = true
      breath.volume = 0.3

      musicRef.current = music
      beatRef.current = beat
      breathRef.current = breath
    }

    const handleInteraction = () => {
      if (!interactionRef.current) {
        interactionRef.current = true

        const audioContext = new window.AudioContext()
        audioContextRef.current = audioContext

        const source = audioContext.createMediaElementSource(musicRef.current!)
        const gainNode = audioContext.createGain()
        gainNode.gain.value = 0.8
        gainNodeRef.current = gainNode

        source.connect(gainNode).connect(audioContext.destination)

        audioContext.resume().then(() => {
          if (!pause) {
            musicRef.current!.play().catch((error) => {
              console.error('Music playback failed:', error)
            })
            beatRef.current!.play().catch((error) => {
              console.error('Heartbeat playback failed:', error)
            })
            breathRef.current!.play().catch((error) => {
              console.error('Breath playback failed:', error)
            })
          }
        })
      }
    }

    initializeAudio()

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
        audioContextRef.current.close().catch((error) => {
          console.error('Failed to close AudioContext:', error)
        })
        audioContextRef.current = null
      }
    }
  }, [pause, level, levelAudioMap])

  // Handle level changes and audio playback management
  useEffect(() => {
    const { beat: beatSrc, breath: breathSrc } = levelAudioMap[level] || {}

    if (beatSrc && breathSrc) {
      beatRef.current = new Audio(beatSrc)
      beatRef.current.loop = true
      breathRef.current!.src = breathSrc
    }

    if (beatRef.current) {
      if (!heartbeatStopped && interactionRef.current && !pause) {
        beatRef.current.play().catch((error) => {
          console.error('Heartbeat playback failed:', error)
        })
      } else {
        beatRef.current.pause()
        beatRef.current.currentTime = 0
      }
    }

    if (breathRef.current) {
      if (!heartbeatStopped && interactionRef.current && !pause) {
        breathRef.current.play().catch((error) => {
          console.error('Breath playback failed:', error)
        })
      } else {
        breathRef.current.pause()
        breathRef.current.currentTime = 0
      }
    }
  }, [level, heartbeatStopped, pause, levelAudioMap])

  // Handle game over effect
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
      // Reset audio sources to level 1
      const { beat: beatSrc, breath: breathSrc } = levelAudioMap[1]
      if (beatSrc && breathSrc) {
        beatRef.current = new Audio(beatSrc)
        beatRef.current.loop = true
        breathRef.current!.src = breathSrc
      }
    }
  }, [gameOver, levelAudioMap])

  // Handle pause effect
  useEffect(() => {
    if (pause) {
      setHeartbeatStopped(true)
      if (musicRef.current) {
        musicRef.current.pause()
      }
      if (beatRef.current) {
        beatRef.current.pause()
      }
      if (breathRef.current) {
        breathRef.current.pause()
      }
      // Reset audio sources to level 1
      const { beat: beatSrc, breath: breathSrc } = levelAudioMap[1]
      if (beatSrc && breathSrc) {
        beatRef.current = new Audio(beatSrc)
        beatRef.current.loop = true
        breathRef.current!.src = breathSrc
      }
    } else {
      setHeartbeatStopped(false)
      if (musicRef.current) {
        musicRef.current.play().catch((error) => {
          console.error('Music playback failed:', error)
        })
      }
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
  }, [pause, heartbeatStopped, levelAudioMap])

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
