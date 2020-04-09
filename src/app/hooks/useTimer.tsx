import { useRef, useState, useEffect } from "react";

export default function useTimer(callback: () => void, interval: number) {
  const [timerIsRunning, setTimerIsRunning] = useState(true);
  const fn = useRef() as React.MutableRefObject<() => void>;
  fn.current = callback;

  useEffect(() => {
    if (timerIsRunning) {
      const intervalId = setInterval(() => fn.current(), interval);
      return () => clearInterval(intervalId);
    }
  }, [timerIsRunning, interval]);

  useEffect(() => {
    setTimerIsRunning(false);
  }, []);

  return {
    timerIsRunning,
    toggleTimerIsRunning(to: boolean) {
      setTimerIsRunning(to);
    },
  };
}
