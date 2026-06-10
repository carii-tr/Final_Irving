import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";

function ProjectForm() {
  const { cvData, setCvData } = useContext(CVContext);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tecnologias: "",
    repositorio: "",
    deploy: "",
    imagen: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const add = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) return;

    const newItem = {
      id: Date.now(),
      ...form
    };

    setCvData({
      ...cvData,
      projects: [...cvData.projects, newItem]
    });

    setForm({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
      imagen: ""
    });
  };

  const remove = (id) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.filter(p => p.id !== id)
    });
  };

  return (
    <div>
      <h2>Proyectos</h2>

      <form onSubmit={add}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input name="tecnologias" placeholder="Tecnologías" value={form.tecnologias} onChange={handleChange} />
        <input name="repositorio" placeholder="Repositorio" value={form.repositorio} onChange={handleChange} />
        <input name="deploy" placeholder="Deploy" value={form.deploy} onChange={handleChange} />
        <input name="imagen" placeholder="Imagen URL" value={form.imagen} onChange={handleChange} />

        <button type="submit">Agregar</button>
      </form>

      {cvData.projects.map(p => (
        <div key={p.id}>
          <strong>{p.nombre}</strong>
          <p>{p.descripcion}</p>
          <button onClick={() => remove(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ProjectForm;