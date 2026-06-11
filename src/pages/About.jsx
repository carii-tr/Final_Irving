function About() {
  return (
    <div className="page page--about">
      <div className="about__content">
        <h1 className="about__title">DevProfile</h1>
        <p className="about__subtitle">Generador dinámico de CV en PDF</p>

        <div className="about__section">
          <h2 className="about__section-title">¿Qué es DevProfile?</h2>
          <p className="about__text">
            DevProfile es una aplicación web desarrollada en React que permite capturar,
            editar y exportar un CV profesional en formato PDF de manera dinámica.
          </p>
        </div>

        <div className="about__section">
          <h2 className="about__section-title">Tecnologías utilizadas</h2>
          <ul className="about__list">
            <li>React + Vite</li>
            <li>React Router DOM</li>
            <li>Context API + LocalStorage</li>
            <li>Recharts</li>
            <li>html2canvas + jsPDF</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
