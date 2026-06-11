import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page page--home">
      <div className="home__content">
        <h1 className="home__title">DevProfile</h1>
        <p className="home__subtitle">Generador dinámico de CV profesional</p>
        <p className="home__description">
          Captura tu información, previsualiza tu CV y expórtalo a PDF con un solo clic.
        </p>
        <Link className="btn btn--primary" to="/editor">
          Comenzar ahora
        </Link>
      </div>
    </div>
  );
}

export default Home;
