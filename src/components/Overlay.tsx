import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
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

  useEffect(() => {
    // Preload audio files
    const preloadAudio = (src: string) => {
      const audio = new Audio(src)
      audio.preload = 'auto'
      return audio
    }

    const audioFiles = Object.values(levelAudioMap).flatMap(
      ({ beat, breath }) => [preloadAudio(beat), preloadAudio(breath)]
    )

    return () => {
      audioFiles.forEach((audio) => audio.pause())
    }
  }, [levelAudioMap])

  const initializeAudio = useCallback(() => {
    const music = new Audio('/mainsound.mp3')
    music.preload = 'auto'
    music.loop = true

    const beat = new Audio(levelAudioMap[level]?.beat || '/heart1.mp3')
    beat.preload = 'auto'
    beat.loop = true
    beat.volume = 0.5

    const breath = new Audio(levelAudioMap[level]?.breath || '/breath1.mp3')
    breath.preload = 'auto'
    breath.loop = true
    breath.volume = 0.3

    musicRef.current = music
    beatRef.current = beat
    breathRef.current = breath
  }, [level, levelAudioMap])

  const handleInteraction = useCallback(() => {
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
          musicRef.current!.play().catch(console.error)
          beatRef.current!.play().catch(console.error)
          breathRef.current!.play().catch(console.error)
        }
      })
    }
  }, [pause])

  useEffect(() => {
    initializeAudio()

    document.addEventListener('click', handleInteraction)
    document.addEventListener('keydown', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)

      if (musicRef.current) musicRef.current.pause()
      if (beatRef.current) beatRef.current.pause()
      if (breathRef.current) breathRef.current.pause()
      if (audioContextRef.current)
        audioContextRef.current.close().catch(console.error)
    }
  }, [initializeAudio, handleInteraction])

  useEffect(() => {
    const { beat: beatSrc, breath: breathSrc } = levelAudioMap[level] || {}

    if (beatSrc && breathSrc) {
      if (beatRef.current) beatRef.current.src = beatSrc
      if (breathRef.current) breathRef.current.src = breathSrc
    }

    if (interactionRef.current && !pause) {
      if (beatRef.current) beatRef.current.play().catch(console.error)
      if (breathRef.current) breathRef.current.play().catch(console.error)
    }
  }, [level, heartbeatStopped, pause, levelAudioMap])

  useEffect(() => {
    if (gameOver) {
      setHeartbeatStopped(true)
      if (beatRef.current) beatRef.current.pause()
      if (breathRef.current) breathRef.current.pause()
      if (musicRef.current) musicRef.current.pause()
    }
  }, [gameOver])

  useEffect(() => {
    if (pause) {
      setHeartbeatStopped(true)
      if (musicRef.current) musicRef.current.pause()
      if (beatRef.current) beatRef.current.pause()
      if (breathRef.current) breathRef.current.pause()
    } else {
      setHeartbeatStopped(false)
      if (interactionRef.current) {
        if (musicRef.current) musicRef.current.play().catch(console.error)
        if (beatRef.current) beatRef.current.play().catch(console.error)
        if (breathRef.current) breathRef.current.play().catch(console.error)
      }
    }
  }, [pause, heartbeatStopped])

  return (
    <>
      {pause ? (
        <StartGame
          title="You want to survive, just click on your screen."
          instructions="Use [WASD] to move and [Space] for dash. To pick up oxygen use [E]"
          footer="This game contains sounds, be careful. Github: Roman1510"
        />
      ) : (
        <MaskOverlay />
      )}
    </>
  )
}

export default Overlay
