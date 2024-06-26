import { useEffect, useMemo, useRef, useCallback } from 'react'
import { useGame } from '../hooks/useGame'

const useSounds = () => {
  const { pause, level, gameOver } = useGame()
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const beatRef = useRef<HTMLAudioElement | null>(null)
  const breathRef = useRef<HTMLAudioElement | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const interactionRef = useRef(false)

  const levelSpeedMap = useMemo(
    () => ({
      1: 1.1,
      2: 1.5,
      3: 1.85,
      4: 2.3,
    }),
    []
  )

  useEffect(() => {
    const preloadAudio = (src: string) => {
      const audio = new Audio(src)
      audio.preload = 'auto'
      return audio
    }

    const music = preloadAudio('/mainsound.mp3')
    const beat = preloadAudio('/heart.mp3')
    const breath = preloadAudio('/breath.mp3')

    music.loop = true
    beat.loop = true
    beat.volume = 0.5
    breath.loop = true
    breath.volume = 0.3

    musicRef.current = music
    beatRef.current = beat
    breathRef.current = breath

    return () => {
      music.pause()
      beat.pause()
      breath.pause()
    }
  }, [])

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
  }, [handleInteraction])

  useEffect(() => {
    const playbackRate =
      levelSpeedMap[level as keyof typeof levelSpeedMap] || 1.0

    if (beatRef.current) beatRef.current.playbackRate = playbackRate
    if (breathRef.current) breathRef.current.playbackRate = playbackRate

    if (interactionRef.current && !pause) {
      if (beatRef.current) beatRef.current.play().catch(console.error)
      if (breathRef.current) breathRef.current.play().catch(console.error)
    }
  }, [level, pause, levelSpeedMap])

  useEffect(() => {
    if (gameOver || pause) {
      if (musicRef.current) musicRef.current.pause()
      if (beatRef.current) beatRef.current.pause()
      if (breathRef.current) breathRef.current.pause()
    } else {
      if (interactionRef.current) {
        if (musicRef.current) musicRef.current.play().catch(console.error)
        if (beatRef.current) beatRef.current.play().catch(console.error)
        if (breathRef.current) breathRef.current.play().catch(console.error)
      }
    }
  }, [pause, gameOver])

  return null
}

export default useSounds
