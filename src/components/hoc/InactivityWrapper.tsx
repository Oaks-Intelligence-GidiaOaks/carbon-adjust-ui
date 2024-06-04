import React, { ReactNode } from "react";
import useInactivity from "@/hooks/useInactivity";

const InactivityWrapper: React.FC<{
  onLogout: () => void;
  children: ReactNode;
}> = ({ onLogout, children }) => {
  useInactivity(onLogout);

  return <>{children}</>;
};

export default InactivityWrapper;
