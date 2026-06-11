import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function CVPreview() {
  const { cvData } = useContext(CVContext);
  const { personal, skills, projects, education, languages } = cvData;

  return (
    <div id="cv-preview" className="cv">

      {/* ================= HEADER ================= */}
      <section className="cv__section cv__section--header">
        <h1 className="cv__name">
          {personal.nombre || "Nombre no definido"}
        </h1>

        <h3 className="cv__role">{personal.profesion}</h3>

        <p className="cv__text">{personal.ciudad}</p>
        <p className="cv__text">{personal.descripcion}</p>

        <div className="cv__contact">
          <p>{personal.correo}</p>
          <p>{personal.telefono}</p>
        </div>

        <div className="cv__links">
          {personal.github && (
            <a className="cv__link" href={personal.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}

          {personal.linkedin && (
            <a className="cv__link" href={personal.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>

        {personal.imagen && (
          <img className="cv__avatar" src={personal.imagen} alt="perfil" />
        )}
      </section>

      {/* ================= SKILLS ================= */}
      <section className="cv__section">
        <h2 className="cv__title">Habilidades</h2>

        {skills.length === 0 ? (
          <p className="cv__empty">Sin habilidades</p>
        ) : (
          skills.map((s) => (
            <div className="cv__item" key={s.id}>
              <strong>{s.nombre}</strong>

              <div className="cv__bar">
                <div
                  className="cv__bar-fill"
                  style={{ width: `${s.nivel}%` }}
                >
                  {s.nivel}%
                </div>
              </div>

              <small>{s.categoria}</small>
            </div>
          ))
        )}
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="cv__section">
        <h2 className="cv__title">Proyectos</h2>

        {projects.length === 0 ? (
          <p className="cv__empty">Sin proyectos</p>
        ) : (
          projects.map((p) => (
            <div className="cv__item" key={p.id}>
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
              <p>{p.tecnologias}</p>

              <div className="cv__links">
                {p.repositorio && (
                  <a className="cv__link" href={p.repositorio}>Repo</a>
                )}

                {p.deploy && (
                  <a className="cv__link" href={p.deploy}>Deploy</a>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="cv__section">
        <h2 className="cv__title">Educación</h2>

        {education.length === 0 ? (
          <p className="cv__empty">Sin educación</p>
        ) : (
          education.map((e) => (
            <div className="cv__item" key={e.id}>
              <h3>{e.institucion}</h3>
              <p>{e.programa}</p>
              <p>{e.periodo}</p>
              <p>{e.descripcion}</p>
            </div>
          ))
        )}
      </section>

      {/* ================= LANGUAGES ================= */}
      <section className="cv__section">
        <h2 className="cv__title">Idiomas</h2>

        {languages.length === 0 ? (
          <p className="cv__empty">Sin idiomas</p>
        ) : (
          languages.map((l) => (
            <div className="cv__item" key={l.id}>
              <strong>{l.idioma}</strong> - {l.nivel}
              <p>{l.descripcion}</p>
            </div>
          ))
        )}
      </section>

    </div>
  );
}

export default CVPreview;