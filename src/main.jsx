import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import { CVProvider } from "./context/CVContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CVProvider>
          <App />
        </CVProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);