import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";

function EducationForm() {
  const { cvData, setCvData } = useContext(CVContext);

  const [form, setForm] = useState({
    institucion: "",
    programa: "",
    periodo: "",
    descripcion: "",
    evidencia: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const add = (e) => {
    e.preventDefault();

    if (!form.institucion.trim()) return;

    const newItem = {
      id: Date.now(),
      ...form
    };

    setCvData({
      ...cvData,
      education: [...cvData.education, newItem]
    });

    setForm({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      evidencia: ""
    });
  };

  const remove = (id) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter(e => e.id !== id)
    });
  };

  return (
    <div>
      <h2>Educación</h2>

      <form onSubmit={add}>
        <input name="institucion" placeholder="Institución" value={form.institucion} onChange={handleChange} />
        <input name="programa" placeholder="Programa" value={form.programa} onChange={handleChange} />
        <input name="periodo" placeholder="Periodo" value={form.periodo} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input name="evidencia" placeholder="Evidencia URL" value={form.evidencia} onChange={handleChange} />

        <button type="submit">Agregar</button>
      </form>

      {cvData.education.map(e => (
        <div key={e.id}>
          <strong>{e.institucion}</strong>
          <p>{e.programa}</p>
          <button onClick={() => remove(e.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default EducationForm;