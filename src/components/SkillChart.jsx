import { useContext } from "react";
import { CVContext } from "../context/CVContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function SkillChart() {

  const { cvData } = useContext(CVContext);

  console.log(cvData.skills);

  return (
    <div>

      <h2>Gráfica de Habilidades</h2>

      <BarChart
        width={700}
        height={400}
        data={cvData.skills}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="nombre" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="nivel"
        />
      </BarChart>

    </div>
  );
}

export default SkillChart;