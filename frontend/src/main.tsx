import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContextProvider.tsx";
import { PartContextProvider } from "./context/PartContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <PartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PartContextProvider>
    </AppContextProvider>
  </StrictMode>,
);