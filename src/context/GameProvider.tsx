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
} from 'react';
import { useDebounce } from 'use-debounce';
import { ILevel } from '../types/common';
import { Vector3 } from 'three';

export type GameContextType = {
  pause: boolean;
  setPause: Dispatch<SetStateAction<boolean>>;
  level: ILevel;
  setLevel: Dispatch<SetStateAction<ILevel>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  oxygenPosition: Vector3;
  setSpeedUp: Dispatch<SetStateAction<boolean>>;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [pause, setPause] = useState(true);
  const [level, setLevel] = useState<ILevel>(1);
  const [seconds, setSeconds] = useState(0);
  const [speedUp, setSpeedUp] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const debouncedLevel = useDebounce(level, 100)[0]; // Debounce the level updates

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const updateGame = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = (timestamp - startTimeRef.current) / 1000;
      const interval = speedUp ? 1.55 : 15.5; // seconds

      if (elapsedTime >= interval) {
        setSeconds((prevSeconds) => prevSeconds + interval);
        setLevel((prevLevel) => (prevLevel + 1) as ILevel);
        setGameOver(false);
        startTimeRef.current = timestamp;
      }

      if (elapsedTime >= 60) {
        setGameOver(true);
        cancelAnimationFrame(requestRef.current!);
        return;
      }

      requestRef.current = requestAnimationFrame(updateGame);
    },
    [speedUp]
  );

  useEffect(() => {
    if (!pause) {
      requestRef.current = requestAnimationFrame(updateGame);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      startTimeRef.current = null;
    }

    if (pause) {
      setSeconds(0);
      setLevel(1);
      setGameOver(false);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pause, speedUp, updateGame]);

  const generateRandomPositionInRing = (
    innerRadius: number,
    outerRadius: number
  ) => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    return new Vector3(x, -29, z);
  };

  const innerRadius = 300;
  const outerRadius = 500;
  const oxygenPosition = useMemo(
    () => generateRandomPositionInRing(innerRadius, outerRadius),
    [innerRadius, outerRadius]
  );

  const contextValue = useMemo(
    () => ({
      pause,
      setPause,
      level: debouncedLevel,
      setLevel,
      seconds,
      setSeconds,
      setSpeedUp,
      gameOver,
      setGameOver,
      isLoaded,
      setIsLoaded,
      oxygenPosition,
    }),
    [pause, debouncedLevel, seconds, gameOver, isLoaded, oxygenPosition]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
