import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  role: string | undefined;
  children: ReactNode;
};

const ProtectedRoute = ({ role, children }: Props) => {
  //   const { pathname } = useLocation();
  //   const userData = useSelector((state: RootState) => state.user.user);
  //   console.log(pathname);

  const navigate = useNavigate();
  if (!role) {
    navigate("/login");
  }

  //   if (role) {
  //     // home owner checks
  //     if (role === "HOME_OCCUPANT") {
  //       // it pathname is not for homeoccupant
  //       if (
  //         ![
  //           "hia",
  //           "aggregator",
  //           "finance",
  //           "subcontractor",
  //           "insurance",
  //           "admin",
  //         ].every((type, i) => !pathname.includes(type))
  //       ) {
  //         navigate("/login");
  //       }
  //     }
  //   }

  return <>{children}</>;
};

export default ProtectedRoute;
