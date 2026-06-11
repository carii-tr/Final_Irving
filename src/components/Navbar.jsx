import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">

      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/editor">Editor</Link>
      <Link className="link" to="/dashboard">Dashboard</Link>
      <Link className="link" to="/preview">Preview</Link>
      <Link className="link" to="/about">About</Link>

    </nav>
  );
}

export default Navbar;