import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function EducationForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    institucion: "", programa: "", periodo: "", descripcion: "", evidencia: "",
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
    setForm({ institucion: "", programa: "", periodo: "", descripcion: "", evidencia: "" });
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate("education", form, cvData.education);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (editingId) {
      setCvData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === editingId ? { ...e, ...form } : e),
      }));
      showToast(`"${form.programa}" actualizado.`);
    } else {
      setCvData(prev => ({
        ...prev,
        education: [...prev.education, { id: uuid(), ...form }],
      }));
      showToast(`"${form.programa}" agregado.`);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setErrors({});
  };

  const handleDelete = (item) => {
    if (!window.confirm(`¿Eliminar "${item.programa}"?`)) return;
    setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== item.id) }));
    showToast(`"${item.programa}" eliminado.`, "info");
    if (editingId === item.id) resetForm();
  };

  return (
    <div className="form-section">
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}

      <form className="form form--education" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Educación y certificaciones</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="edu-institucion">Institución *</label>
          <input
            className={`form__input ${errors.institucion ? "form__input--error" : ""}`}
            id="edu-institucion"
            name="institucion"
            placeholder="Ej: Universidad de Guadalajara, Platzi..."
            value={form.institucion}
            onChange={handleChange}
          />
          {errors.institucion && <p className="form__error">{errors.institucion}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="edu-programa">Programa o certificación *</label>
          <input
            className={`form__input ${errors.programa ? "form__input--error" : ""}`}
            id="edu-programa"
            name="programa"
            placeholder="Ej: Ingeniería en Sistemas, Curso de React..."
            value={form.programa}
            onChange={handleChange}
          />
          {errors.programa && <p className="form__error">{errors.programa}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="edu-periodo">Periodo *</label>
          <input
            className={`form__input ${errors.periodo ? "form__input--error" : ""}`}
            id="edu-periodo"
            name="periodo"
            placeholder="Ej: 2020 - 2024, Enero 2023..."
            value={form.periodo}
            onChange={handleChange}
          />
          {errors.periodo && <p className="form__error">{errors.periodo}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="edu-descripcion">Descripción</label>
          <textarea
            className={`form__textarea ${errors.descripcion ? "form__input--error" : ""}`}
            id="edu-descripcion"
            name="descripcion"
            placeholder="Descripción breve del programa o lo aprendido..."
            value={form.descripcion}
            onChange={handleChange}
            rows={3}
          />
          {errors.descripcion && <p className="form__error">{errors.descripcion}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="edu-evidencia">Enlace de evidencia</label>
          <input
            className={`form__input ${errors.evidencia ? "form__input--error" : ""}`}
            id="edu-evidencia"
            name="evidencia"
            placeholder="https://certificado.com/mi-certificado"
            value={form.evidencia}
            onChange={handleChange}
          />
          {errors.evidencia && <p className="form__error">{errors.evidencia}</p>}
        </div>

        <div className="form__actions">
          <button className="form__button form__button--primary" type="submit">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
          {editingId && (
            <button className="form__button form__button--secondary" type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {cvData.education.length > 0 && (
        <div className="list list--education">
          <h3 className="list__title">Educación registrada ({cvData.education.length})</h3>
          {cvData.education.map(e => (
            <div className={`list__item ${editingId === e.id ? "list__item--editing" : ""}`} key={e.id}>
              <div className="list__item-info">
                <span className="list__item-name">{e.programa}</span>
                <span className="list__item-tag">{e.institucion}</span>
                {e.periodo && <span className="list__item-meta">{e.periodo}</span>}
              </div>
              <div className="list__item-actions">
                <button className="list__button list__button--edit" onClick={() => handleEdit(e)}>Editar</button>
                <button className="list__button list__button--delete" onClick={() => handleDelete(e)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationForm;
