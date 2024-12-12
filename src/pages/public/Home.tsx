import { RootState } from "@/app/store";
import { LandingPage } from "../LandingPage";
import { useSelector } from "react-redux";
import { AuthUserProfile } from "@/types/general";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type {  Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type Props = {};

const Home = (_: Props) => {
  const navigate = useNavigate();
  const [init, setInit] = useState(false);

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

  initParticlesEngine(async (engine:Engine) => {
   
    await loadSlim(engine);
  }).then(() => {
    setInit(true);
  });

  return <div>
      {init && (
        <Particles
          id="tsparticles"
          options={{
          
            particles: {
              color: {
                value: "#1c57ee",
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 20,
            },
            opacity: {
                value: { min: 0.2, max: 0.5 },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 3, max: 8 },
            },
            }
}}
        />
      )}
    <LandingPage />;
    </div>
};

export default Home;
