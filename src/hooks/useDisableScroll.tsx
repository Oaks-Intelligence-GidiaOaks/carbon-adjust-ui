import { useEffect } from "react";

const useDisableScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [condition]);
};

export default useDisableScroll;
