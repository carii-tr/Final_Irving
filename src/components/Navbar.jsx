import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar__brand">DevProfile</span>

      <ul className="navbar__links">
        <li>
          <NavLink className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} to="/">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} to="/editor">
            Editor
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} to="/preview">
            Preview
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => `navbar__link ${isActive ? "navbar__link--active" : ""}`} to="/about">
            Acerca de
          </NavLink>
        </li>
      </ul>

      <div className="navbar__actions">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
