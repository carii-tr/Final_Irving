import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function CVPreview() {
  const { cvData } = useContext(CVContext);
  const { personal, skills, projects, education, languages } = cvData;

  const hasData =
    personal.nombre ||
    skills.length > 0 ||
    projects.length > 0 ||
    education.length > 0 ||
    languages.length > 0;

  if (!hasData) {
    return (
      <div className="cv-empty">
        <p className="cv-empty__message">
          Aún no hay información. Ve al <strong>Editor</strong> para agregar tus datos.
        </p>
      </div>
    );
  }

  return (
    <div id="cv-preview" className="cv">

      {/* HEADER */}
      <section className="cv__section cv__section--header">
        {personal.imagen && (
          <img className="cv__avatar" src={personal.imagen} alt="Foto de perfil" />
        )}

        <div className="cv__header-info">
          <h1 className="cv__name">{personal.nombre || "Sin nombre"}</h1>
          {personal.profesion && <h2 className="cv__role">{personal.profesion}</h2>}
          {personal.ciudad && <p className="cv__location">📍 {personal.ciudad}</p>}
          {personal.descripcion && <p className="cv__description">{personal.descripcion}</p>}

          <div className="cv__contact">
            {personal.correo && <span className="cv__contact-item">✉️ {personal.correo}</span>}
            {personal.telefono && <span className="cv__contact-item">📞 {personal.telefono}</span>}
          </div>

          <div className="cv__links">
            {personal.github && (
              <a className="cv__link" href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
            )}
            {personal.linkedin && (
              <a className="cv__link" href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      {skills.length > 0 && (
        <section className="cv__section">
          <h2 className="cv__title">Habilidades</h2>
          <div className="cv__skills-grid">
            {skills.map(s => (
              <div className="cv__skill" key={s.id}>
                <div className="cv__skill-header">
                  <strong className="cv__skill-name">{s.nombre}</strong>
                  <span className="cv__skill-level">{s.nivel}%</span>
                </div>
                {s.categoria && <small className="cv__skill-category">{s.categoria}</small>}
                <div className="cv__bar">
                  <div className="cv__bar-fill" style={{ width: `${s.nivel}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROYECTOS */}
      {projects.length > 0 && (
        <section className="cv__section">
          <h2 className="cv__title">Proyectos</h2>
          {projects.map(p => (
            <div className="cv__item cv__item--project" key={p.id}>
              <h3 className="cv__item-title">{p.nombre}</h3>
              {p.descripcion && <p className="cv__item-description">{p.descripcion}</p>}
              {p.tecnologias && (
                <p className="cv__item-tech">
                  <strong>Tecnologías:</strong> {p.tecnologias}
                </p>
              )}
              <div className="cv__links">
                {p.repositorio && <a className="cv__link" href={p.repositorio} target="_blank" rel="noreferrer">Repositorio</a>}
                {p.deploy && <a className="cv__link" href={p.deploy} target="_blank" rel="noreferrer">Demo</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* EDUCACIÓN */}
      {education.length > 0 && (
        <section className="cv__section">
          <h2 className="cv__title">Educación</h2>
          {education.map(e => (
            <div className="cv__item cv__item--education" key={e.id}>
              <h3 className="cv__item-title">{e.programa}</h3>
              <p className="cv__item-subtitle">{e.institucion}</p>
              {e.periodo && <p className="cv__item-meta">{e.periodo}</p>}
              {e.descripcion && <p className="cv__item-description">{e.descripcion}</p>}
              {e.evidencia && (
                <a className="cv__link" href={e.evidencia} target="_blank" rel="noreferrer">Ver certificado</a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* IDIOMAS */}
      {languages.length > 0 && (
        <section className="cv__section">
          <h2 className="cv__title">Idiomas</h2>
          {languages.map(l => (
            <div className="cv__item cv__item--language" key={l.id}>
              <strong className="cv__item-title">{l.idioma}</strong>
              <span className="cv__item-badge">{l.nivel}</span>
              {l.descripcion && <p className="cv__item-description">{l.descripcion}</p>}
            </div>
          ))}
        </section>
      )}

    </div>
  );
}

export default CVPreview;
