import { RootState } from "@/app/store";
import { LandingPage } from "../LandingPage";
import { useSelector } from "react-redux";
import { AuthUserProfile } from "@/types/general";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

const Home = (_: Props) => {
  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.user.user);

  const handleRedirect = (user: AuthUserProfile, role: string) => {
    if (role === "HOME_OCCUPANT") return navigate("/dashboard");
    if (role === "ADMIN") return navigate("/admin");
    if (role === "MERCHANT") {
      if (user.status === "pending") {
        return navigate("/account-setup");
      }
      return navigate("/merchant");
    }
  };

  useEffect(() => {
    const userRole = userData?.roles[0];

    if (userRole) {
      console.log(userRole);

      if (userRole === "ADMIN") {
        return navigate("/admin");
      }

      handleRedirect(userData, userData.roles[0]);
    }
  }, [userData?.roles[0]]);

  return <LandingPage />;
};

export default Home;
