import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import SocketService from "@/repository/socket";
import ChatSocketService from "./repository/chatSocket";

function App() {
  const queryClient = new QueryClient();
  const { user } = useSelector((state: RootState) => state.user);

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

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Toaster
        toastOptions={{
          style: {
            zIndex: 999999, // For toasts
          },
          duration: 7000,
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
