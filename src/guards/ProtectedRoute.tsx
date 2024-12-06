import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  role: string | undefined;
  children: ReactNode;
};

const ProtectedRoute = ({ role, children }: Props) => {
  const navigate = useNavigate();

  if (!role) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
