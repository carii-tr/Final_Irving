import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function ProjectForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tecnologias: "",
    repositorio: "",
    deploy: "",
    imagen: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
      imagen: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const addProject = (e) => {
    e.preventDefault();

    const validationErrors = validate("project", form, cvData.projects);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: uuid(), ...form }]
    }));

    resetForm();
  };

  const editProject = (p) => {
    setForm(p);
    setEditingId(p.id);
  };

  const updateProject = (e) => {
    e.preventDefault();

    const validationErrors = validate("project", form, cvData.projects);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === editingId ? { ...p, ...form } : p
      )
    }));

    resetForm();
  };

  const deleteProject = (id) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <form className="form form--projects" onSubmit={editingId ? updateProject : addProject}>
        <h2 className="form__title">Proyectos</h2>

        <input className="form__input" name="nombre" value={form.nombre} onChange={handleChange} />
        <input className="form__input" name="descripcion" value={form.descripcion} onChange={handleChange} />
        <input className="form__input" name="tecnologias" value={form.tecnologias} onChange={handleChange} />
        <input className="form__input" name="repositorio" value={form.repositorio} onChange={handleChange} />
        <input className="form__input" name="deploy" value={form.deploy} onChange={handleChange} />

        <button className="form__button" type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list list--projects">
        {cvData.projects.map(p => (
          <div className="list__item" key={p.id}>
            <span>{p.nombre}</span>

            <div className="list__actions">
              <button onClick={() => editProject(p)}>Editar</button>
              <button onClick={() => deleteProject(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectForm;