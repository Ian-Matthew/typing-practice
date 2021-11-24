import React from "react";
import { usePageVisibility } from "../../utils/useBrowserVisible";
export function useTimer({
  pauseOffScreen = true,
}: {
  pauseOffScreen?: boolean;
}) {
  const [time, setTime] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const isVisible = usePageVisibility();

  // Handle pausing offscreen if needed
  React.useEffect(() => {
    if (pauseOffScreen) {
      setIsActive(isVisible);
    }
  }, [isVisible, pauseOffScreen]);

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
