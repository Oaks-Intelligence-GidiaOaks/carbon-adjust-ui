import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({
  children,
  dependentValue,
}: {
  children?: ReactNode;
  dependentValue?: number | string;
}) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, dependentValue]);

  return <>{children}</>;
};

export default ScrollToTop;
