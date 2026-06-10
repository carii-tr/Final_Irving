import { useContext } from "react";
import { ThemeContext }
from "../context/ThemeContext";

function ThemeToggle() {

  const {
    darkMode,
    setDarkMode
  } = useContext(ThemeContext);

  return (
    <button
      onClick={() =>
        setDarkMode(!darkMode)
      }
    >
      {darkMode
        ? "☀️ Claro"
        : "🌙 Oscuro"}
    </button>
  );
}

export default ThemeToggle;