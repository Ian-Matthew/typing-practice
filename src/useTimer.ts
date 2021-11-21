import React from "react"
export function useTimer({defaultActive=false}  : {defaultActive: boolean}) {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(defaultActive);

  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  React.useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [isActive, seconds]);

  return { seconds, isActive, toggle, reset };
}