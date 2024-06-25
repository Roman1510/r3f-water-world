import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { useControls } from 'leva'
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
  const [pause, setPause] = useState(false)
  const [level, setLevel] = useState<ILevel>(1)
  const [seconds, setSeconds] = useState(0)
  const [speedUp, setSpeedUp] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useControls({ SpeedUp: { value: speedUp, onChange: setSpeedUp } })

  useEffect(() => {
    let timer: number | undefined

    const interval = speedUp ? 1500 : 15000

    const startLevelTimer = () => {
      let elapsedTime = 0
      timer = setInterval(() => {
        elapsedTime += interval / 1000
        console.log('elapsedtime', elapsedTime)
        setSeconds(elapsedTime)
        if (elapsedTime >= 60) {
          setGameOver(true)
          if (timer) clearInterval(timer)
        } else {
          setLevel((prevLevel) => (prevLevel + 1) as ILevel)
          setGameOver(false)
        }
      }, interval)
    }

    if (!pause) {
      startLevelTimer()
    } else {
      if (timer) clearInterval(timer)
    }

    if (pause) {
      setSeconds(0)
      setLevel(1)
      setGameOver(false)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [pause, speedUp])

  const providerValues = {
    pause,
    setPause,
    level,
    setLevel,
    seconds,
    setSeconds,
    speedUp,
    setSpeedUp,
    gameOver,
    setGameOver,
    isLoaded,
    setIsLoaded,
  }

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  )
}
