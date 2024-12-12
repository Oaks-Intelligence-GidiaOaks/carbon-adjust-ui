import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { Toaster } from "react-hot-toast";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import SocketService from "@/repository/socket";
import ChatSocketService from "./repository/chatSocket";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkBanner from "./layouts/NetworkBanner";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type {  Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

function App() {
  const queryClient = new QueryClient();
  const { user } = useSelector((state: RootState) => state.user);
  const isOnline = useNetworkStatus();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (user?._id) {
      ChatSocketService.connect();
      SocketService.connect(user._id);
    }

    return () => {
      ChatSocketService.disconnect();
      SocketService.disconnect();
    };
  }, [user?._id]);

  initParticlesEngine(async (engine:Engine) => {
   
    await loadSlim(engine);
  }).then(() => {
    setInit(true);
  });

 
  return (
    <div>
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
      <NetworkBanner isOnline={isOnline} />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
        <Toaster
          toastOptions={{
            style: {
              zIndex: 999999,
            },
            duration: 7000,
          }}
        />
      </QueryClientProvider>
    </div>
  );
}

export default App;
