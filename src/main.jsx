import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { CVProvider } from "./context/CVContext";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CVProvider>
        <App />
      </CVProvider>
    </ThemeProvider>
  </StrictMode>
);