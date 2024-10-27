import { RefObject, useEffect } from "react";

const useScrollIntoView = (ref: RefObject<HTMLDivElement>, dependency: any) => {
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ref, dependency]);
};

export default useScrollIntoView;
