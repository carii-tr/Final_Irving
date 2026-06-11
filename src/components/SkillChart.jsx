import { useContext } from "react";
import { CVContext } from "../context/CVContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";

const COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#0891b2", "#059669", "#d97706", "#dc2626"];

function SkillChart() {
  const { cvData } = useContext(CVContext);

  const data = cvData.skills.map(skill => ({
    name: skill.nombre,
    nivel: skill.nivel,
    categoria: skill.categoria,
  }));

  if (data.length === 0) {
    return (
      <div className="chart chart--empty">
        <p className="chart__empty-message">
          Agrega habilidades en el Editor para ver la gráfica.
        </p>
      </div>
    );
  }

  return (
    <div className="chart">
      <h2 className="chart__title">Nivel de habilidades</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-35}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(value) => [`${value}%`, "Nivel"]} />
          <Bar dataKey="nivel" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SkillChart;
