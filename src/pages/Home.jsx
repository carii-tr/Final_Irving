import { Link } from "react-router-dom";

function Home() {

  return (
    <div>

      <h1>
        DevProfile
      </h1>

      <p>
        Generador Dinámico de CV
      </p>

      <Link to="/editor">
        Comenzar
      </Link>

    </div>
  );
}

export default Home;