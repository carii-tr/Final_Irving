import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";

function LanguageForm() {
  const { cvData, setCvData } = useContext(CVContext);

  const [form, setForm] = useState({
    idioma: "",
    nivel: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const add = (e) => {
    e.preventDefault();

    if (!form.idioma.trim()) return;

    const newItem = {
      id: Date.now(),
      ...form
    };

    setCvData({
      ...cvData,
      languages: [...cvData.languages, newItem]
    });

    setForm({
      idioma: "",
      nivel: "",
      descripcion: ""
    });
  };

  const remove = (id) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.filter(l => l.id !== id)
    });
  };

  return (
    <div>
      <h2>Idiomas</h2>

      <form onSubmit={add}>
        <input name="idioma" placeholder="Idioma" value={form.idioma} onChange={handleChange} />
        <input name="nivel" placeholder="Nivel (Básico, Intermedio...)" value={form.nivel} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />

        <button type="submit">Agregar</button>
      </form>

      {cvData.languages.map(l => (
        <div key={l.id}>
          <strong>{l.idioma}</strong> - {l.nivel}
          <button onClick={() => remove(l.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default LanguageForm;