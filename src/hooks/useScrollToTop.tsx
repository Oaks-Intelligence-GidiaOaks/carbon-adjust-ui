import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UseScrollToTop = (ref: any) => {
  const { pathname } = useLocation();

  useEffect(() => {
    ref.current.scrollTo(0, 0);

    // console.log("pathname changed");
  }, [pathname, ref]);

  return null;
};

export default UseScrollToTop;
