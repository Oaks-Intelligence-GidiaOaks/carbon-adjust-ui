import { useEffect, useRef } from "react";

const useInactivity = (
  logoutCallback: () => void,
  timeout: number = 60 * 60 * 1000
) => {
  const timer = useRef<number>(-1);

  const resetTimer = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(logoutCallback, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
      "touchmove",
    ];

    const handleActivity = () => resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Set the initial timer
    resetTimer();

    return () => {
      window.clearTimeout(timer.current);

      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [logoutCallback, timeout]);

  return null;
};

export default useInactivity;
