import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">

      <h1 className="title">DevProfile</h1>

      <p className="subtitle">
        Generador Dinámico de CV
      </p>

      <Link className="btn btn-primary" to="/editor">
        Comenzar
      </Link>

    </div>
  );
}

export default Home;