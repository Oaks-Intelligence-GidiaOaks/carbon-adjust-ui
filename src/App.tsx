import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

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
