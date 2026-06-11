import { useContext } from "react";
import { CVContext } from "../context/CVContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function SkillChart() {
  const { cvData } = useContext(CVContext);

  const data = cvData.skills.map((skill) => ({
    name: skill.nombre,
    nivel: skill.nivel
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h2>Gráfica de Habilidades</h2>

      {data.length === 0 ? (
        <p>No hay habilidades para mostrar</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Bar dataKey="nivel" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SkillChart;