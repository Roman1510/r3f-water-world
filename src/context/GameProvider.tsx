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
  speedUp: boolean
  setSpeedUp: Dispatch<SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [pause, setPause] = useState(false)
  const [level, setLevel] = useState<ILevel>(1)
  const [seconds, setSeconds] = useState(0)
  const [speedUp, setSpeedUp] = useState(false)

  useControls({ SpeedUp: { value: speedUp, onChange: setSpeedUp } })

  useEffect(() => {
    let timer: number
    const interval = speedUp ? 1500 : 15000

    const startLevelTimer = () => {
      let elapsedTime = 0
      timer = setInterval(() => {
        elapsedTime += interval / 1000
        console.log('elapsedtime', elapsedTime)
        setSeconds(elapsedTime)
        if (elapsedTime >= 60) {
          clearInterval(timer)
        } else {
          setLevel((prevLevel) => (prevLevel + 1) as ILevel)
        }
      }, interval)
    }

    if (!pause) {
      startLevelTimer()
    }

    return () => clearInterval(timer)
  }, [pause, speedUp])

  const providerValues = {
    pause,
    setPause,
    level,
    setLevel,
    seconds,
    speedUp,
    setSpeedUp,
  }

  return (
    <GameContext.Provider value={providerValues}>
      {children}
    </GameContext.Provider>
  )
}
