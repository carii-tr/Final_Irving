import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function CVPreview() {
    const { cvData } = useContext(CVContext);
    const { personal, skills, projects, education, languages } = cvData;

    return (
        <div id="cv-preview" className="cv-container">

            {/* ================= PERSONAL ================= */}
            <section className="section personal-section">

                <h1 className="title">
                    {personal.nombre || "Nombre no definido"}
                </h1>

                <h3 className="subtitle">{personal.profesion}</h3>

                <p className="text">{personal.ciudad}</p>
                <p className="text">{personal.descripcion}</p>

                <p className="text">{personal.correo}</p>
                <p className="text">{personal.telefono}</p>

                <div className="links">

                    {personal.github && (
                        <a
                            className="link"
                            href={personal.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                    )}

                    {personal.linkedin && (
                        <a
                            className="link"
                            href={personal.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    )}
                </div>

                {personal.imagen && (
                    <img
                        className="profile-img"
                        src={personal.imagen}
                        alt="perfil"
                    />
                )}

            </section>

            <hr className="divider" />

            {/* ================= SKILLS ================= */}
            <section className="section skills-section">

                <h2 className="subtitle">Habilidades</h2>

                {skills.length === 0 ? (
                    <p className="text">Sin habilidades</p>
                ) : (
                    skills.map((s) => (
                        <div key={s.id} className="card">

                            <strong>{s.nombre}</strong>

                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${s.nivel}%` }}
                                >
                                    {s.nivel}%
                                </div>
                            </div>

                            <small className="text">
                                {s.categoria}
                            </small>

                        </div>
                    ))
                )}

            </section>

            <hr className="divider" />

            {/* ================= PROJECTS ================= */}
            <section className="section projects-section">

                <h2 className="subtitle">Proyectos</h2>

                {projects.length === 0 ? (
                    <p className="text">Sin proyectos</p>
                ) : (
                    projects.map((p) => (
                        <div key={p.id} className="card">

                            <h3>{p.nombre}</h3>
                            <p>{p.descripcion}</p>
                            <p>{p.tecnologias}</p>

                            <div className="links">

                                {p.repositorio && (
                                    <a
                                        className="link"
                                        href={p.repositorio}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Repo
                                    </a>
                                )}

                                {p.deploy && (
                                    <a
                                        className="link"
                                        href={p.deploy}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Deploy
                                    </a>
                                )}

                            </div>

                        </div>
                    ))
                )}

            </section>

            <hr className="divider" />

            {/* ================= EDUCATION ================= */}
            <section className="section education-section">

                <h2 className="subtitle">Educación</h2>

                {education.length === 0 ? (
                    <p className="text">Sin educación</p>
                ) : (
                    education.map((e) => (
                        <div key={e.id} className="card">

                            <h3>{e.institucion}</h3>
                            <p>{e.programa}</p>
                            <p>{e.periodo}</p>
                            <p>{e.descripcion}</p>

                        </div>
                    ))
                )}

            </section>

            <hr className="divider" />

            {/* ================= LANGUAGES ================= */}
            <section className="section languages-section">

                <h2 className="subtitle">Idiomas</h2>

                {languages.length === 0 ? (
                    <p className="text">Sin idiomas</p>
                ) : (
                    languages.map((l) => (
                        <div key={l.id} className="card">

                            <strong>{l.idioma}</strong> - {l.nivel}

                            <p className="text">
                                {l.descripcion}
                            </p>

                        </div>
                    ))
                )}

            </section>

        </div>
    );
}

export default CVPreview;