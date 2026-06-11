import SkillChart from "../components/SkillChart";

function Dashboard() {
  return (
    <div className="container">

      <h1 className="title">Dashboard</h1>

      <p className="subtitle">
        Resumen de habilidades
      </p>

      <div className="card">
        <SkillChart />
      </div>

    </div>
  );
}

export default Dashboard;