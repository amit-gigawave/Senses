import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "../styles/globals.css";
import App from "./App.tsx";
import AppProvider from "./providers/AppProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <Toaster richColors position="top-right" />
    </AppProvider>
  </StrictMode>
);
