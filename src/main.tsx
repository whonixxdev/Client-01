import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./App.css";
import SmoothScroll from "./components/animations/ScrollSmooth";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>,
);
