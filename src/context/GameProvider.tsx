import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
  useCallback,
  useRef,
} from 'react'
import { useControls } from 'leva'
import { useDebounce } from 'use-debounce'
import { ILevel } from '../types/common'

export type GameContextType = {
  pause: boolean
  setPause: Dispatch<SetStateAction<boolean>>
  level: ILevel
  setLevel: Dispatch<SetStateAction<ILevel>>
  seconds: number
  setSeconds: Dispatch<SetStateAction<number>>
  speedUp: boolean
  setSpeedUp: Dispatch<SetStateAction<boolean>>
  gameOver: boolean
  setGameOver: Dispatch<SetStateAction<boolean>>
  isLoaded: boolean
  setIsLoaded: Dispatch<SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [pause, setPause] = useState(true)
  const [level, setLevel] = useState<ILevel>(1)
  const [seconds, setSeconds] = useState(0)
  const [speedUp, setSpeedUp] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const debouncedLevel = useDebounce(level, 100)[0] // Debounce the level updates

  useControls({ SpeedUp: { value: speedUp, onChange: setSpeedUp } })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const updateGame = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsedTime = (timestamp - startTimeRef.current) / 1000
      const interval = speedUp ? 1.55 : 15.5 // seconds

      if (elapsedTime >= interval) {
        setSeconds((prevSeconds) => prevSeconds + interval)
        setLevel((prevLevel) => (prevLevel + 1) as ILevel)
        setGameOver(false)
        startTimeRef.current = timestamp
      }

      if (elapsedTime >= 60) {
        setGameOver(true)
        cancelAnimationFrame(requestRef.current!)
        return
      }

      requestRef.current = requestAnimationFrame(updateGame)
    },
    [speedUp]
  )

  useEffect(() => {
    if (!pause) {
      requestRef.current = requestAnimationFrame(updateGame)
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      startTimeRef.current = null
    }

    if (pause) {
      setSeconds(0)
      setLevel(1)
      setGameOver(false)
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [pause, speedUp, updateGame])

  const providerValues = useMemo(
    () => ({
      pause,
      setPause,
      level: debouncedLevel,
      setLevel,
      seconds,
      setSeconds,
      speedUp,
      setSpeedUp,
      gameOver,
      setGameOver,
      isLoaded,
      setIsLoaded,
    }),
    [pause, debouncedLevel, seconds, speedUp, gameOver, isLoaded]
  )

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  )
}
