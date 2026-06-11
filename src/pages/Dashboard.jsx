import { useContext } from "react";
import SkillChart from "../components/SkillChart";
import { CVContext } from "../context/CVContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { cvData } = useContext(CVContext);
  const { skills, projects, education, languages } = cvData;

  const stats = [
    { label: "Habilidades", value: skills.length },
    { label: "Proyectos", value: projects.length },
    { label: "Educación", value: education.length },
    { label: "Idiomas", value: languages.length },
  ];

  return (
    <div className="page page--dashboard">
      <div className="page__header">
        <h1 className="page__title">Dashboard</h1>
        <p className="page__subtitle">Resumen de tu información registrada.</p>
      </div>

      <div className="dashboard__stats">
        {stats.map(stat => (
          <div className="stat-card" key={stat.label}>
            <span className="stat-card__value">{stat.value}</span>
            <span className="stat-card__label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dashboard__chart">
        <SkillChart />
      </div>

      {skills.length === 0 && (
        <div className="dashboard__empty">
          <p>No tienes habilidades registradas aún.</p>
          <Link className="btn btn--primary" to="/editor">Ir al editor</Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
