import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  PropsWithChildren,
} from 'react'

export type GameContextType = {
  pause: boolean
  setPause: Dispatch<SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [pause, setPause] = useState(false)

  return (
    <GameContext.Provider value={{ pause, setPause }}>
      {children}
    </GameContext.Provider>
  )
}
