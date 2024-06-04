import { useEffect, useRef } from "react";

const useInactivity = (
  logoutCallback: () => void,
  timeout: number = 10 * 60 * 1000
) => {
  const timer = useRef<number | null>(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(logoutCallback, timeout);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Set the initial timer
    resetTimer();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [logoutCallback, timeout]);

  return null;
};

export default useInactivity;
