import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function ProjectForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    nombre: "", descripcion: "", tecnologias: "",
    repositorio: "", deploy: "", imagen: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const resetForm = () => {
    setForm({ nombre: "", descripcion: "", tecnologias: "", repositorio: "", deploy: "", imagen: "" });
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listToValidate = editingId
      ? cvData.projects.filter(p => p.id !== editingId)
      : cvData.projects;
    const validationErrors = validate("project", form, listToValidate);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (editingId) {
      setCvData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === editingId ? { ...p, ...form } : p),
      }));
      showToast(`Proyecto "${form.nombre}" actualizado.`);
    } else {
      setCvData(prev => ({
        ...prev,
        projects: [...prev.projects, { id: uuid(), ...form }],
      }));
      showToast(`Proyecto "${form.nombre}" agregado.`);
    }
    resetForm();
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id);
    setErrors({});
  };

  const handleDelete = (p) => {
    if (!window.confirm(`¿Eliminar el proyecto "${p.nombre}"?`)) return;
    setCvData(prev => ({ ...prev, projects: prev.projects.filter(x => x.id !== p.id) }));
    showToast(`Proyecto "${p.nombre}" eliminado.`, "info");
    if (editingId === p.id) resetForm();
  };

  return (
    <div className="form-section">
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}

      <form className="form form--projects" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Proyectos</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="project-nombre">Nombre del proyecto *</label>
          <input
            className={`form__input ${errors.nombre ? "form__input--error" : ""}`}
            id="project-nombre"
            name="nombre"
            placeholder="Ej: DevProfile, E-commerce App..."
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="form__error">{errors.nombre}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="project-descripcion">Descripción *</label>
          <textarea
            className={`form__textarea ${errors.descripcion ? "form__input--error" : ""}`}
            id="project-descripcion"
            name="descripcion"
            placeholder="Describe brevemente el proyecto, su objetivo y tu rol..."
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
          />
          {errors.descripcion && <p className="form__error">{errors.descripcion}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="project-tecnologias">Tecnologías utilizadas</label>
          <input
            className="form__input"
            id="project-tecnologias"
            name="tecnologias"
            placeholder="Ej: React, Node.js, MongoDB..."
            value={form.tecnologias}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="project-repositorio">Enlace al repositorio</label>
          <input
            className={`form__input ${errors.repositorio ? "form__input--error" : ""}`}
            id="project-repositorio"
            name="repositorio"
            placeholder="https://github.com/usuario/proyecto"
            value={form.repositorio}
            onChange={handleChange}
          />
          {errors.repositorio && <p className="form__error">{errors.repositorio}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="project-deploy">Enlace al deploy</label>
          <input
            className={`form__input ${errors.deploy ? "form__input--error" : ""}`}
            id="project-deploy"
            name="deploy"
            placeholder="https://mi-proyecto.vercel.app"
            value={form.deploy}
            onChange={handleChange}
          />
          {errors.deploy && <p className="form__error">{errors.deploy}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="project-imagen">URL de imagen representativa</label>
          <input
            className="form__input"
            id="project-imagen"
            name="imagen"
            placeholder="https://ejemplo.com/captura.png"
            value={form.imagen}
            onChange={handleChange}
          />
        </div>

        <div className="form__actions">
          <button className="form__button form__button--primary" type="submit">
            {editingId ? "Actualizar proyecto" : "Agregar proyecto"}
          </button>
          {editingId && (
            <button className="form__button form__button--secondary" type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {cvData.projects.length > 0 && (
        <div className="list list--projects">
          <h3 className="list__title">Proyectos registrados ({cvData.projects.length})</h3>
          {cvData.projects.map(p => (
            <div className={`list__item ${editingId === p.id ? "list__item--editing" : ""}`} key={p.id}>
              <div className="list__item-info">
                <span className="list__item-name">{p.nombre}</span>
                {p.tecnologias && <span className="list__item-tag">{p.tecnologias}</span>}
              </div>
              <div className="list__item-actions">
                <button className="list__button list__button--edit" onClick={() => handleEdit(p)}>Editar</button>
                <button className="list__button list__button--delete" onClick={() => handleDelete(p)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectForm;
