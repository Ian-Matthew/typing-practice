import React from "react";
import { usePageVisibility } from "../../utils/useBrowserVisible";
import { useGameContext } from "./GameContext";
export function useTimer({
  pauseOffScreen = true,
}: {
  pauseOffScreen?: boolean;
}) {
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const isVisible = usePageVisibility();

  // Handle pausing offscreen if needed
  // TODO: need to refactor these timers
  React.useEffect(() => {
    if (pauseOffScreen) {
      if (!isVisible) {
        setIsActive(false);
      }
    }
  }, [isVisible]);

  React.useEffect(() => {
    let interval: number | null = null;
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

export function useGameTimer() {
  const { status } = useGameContext();
  const timer = useTimer({ pauseOffScreen: true });
  React.useEffect(() => {
    if (status === "Active") {
      timer.play();
    } else {
      timer.pause();
    }
  }, [status]);

  return timer;
}
