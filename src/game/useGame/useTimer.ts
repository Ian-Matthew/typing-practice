import React from "react";
import { useGameContext } from "./GameContext";
export function useTimer() {
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  // Handle pausing offscreen if needed

  React.useEffect(() => {
    let interval = null as unknown as number;
    if (isActive) {
      interval = window.setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (time !== 0) {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [isActive, time]);

  function pause() {
    setIsActive(false);
  }
  function play() {
    setIsActive(true);
  }
  function reset() {
    setIsActive(false);
    setTime(0);
  }
  return { time, pause, play, reset };
}
