import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER;

export const useSocket = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (!user?._id) return;

    const socketInstance = io(`${SOCKET_SERVER_URL}?userId=${user?._id}`);

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("socketInstance connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socketInstance) {
        socket?.disconnect();
        console.log("Socket connection closed");
      }
    };
  }, []);

  return socket;
};
