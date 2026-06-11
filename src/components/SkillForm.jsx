import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

const CATEGORIAS = [
  "Programación",
  "Bases de datos",
  "Diseño web",
  "Herramientas de desarrollo",
  "Habilidades blandas",
  "Idiomas",
  "Otra",
];

function SkillForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({ nombre: "", categoria: "", nivel: 50, descripcion: "" });
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
    setForm({ nombre: "", categoria: "", nivel: 50, descripcion: "" });
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listToValidate = editingId
      ? cvData.skills.filter(s => s.id !== editingId)
      : cvData.skills;
    const validationErrors = validate("skill", form, listToValidate);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (editingId) {
      setCvData(prev => ({
        ...prev,
        skills: prev.skills.map(s =>
          s.id === editingId ? { ...s, ...form, nivel: Number(form.nivel) } : s
        ),
      }));
      showToast(`Habilidad "${form.nombre}" actualizada.`);
    } else {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, { id: uuid(), ...form, nivel: Number(form.nivel) }],
      }));
      showToast(`Habilidad "${form.nombre}" agregada.`);
    }
    resetForm();
  };

  const handleEdit = (skill) => {
    setForm(skill);
    setEditingId(skill.id);
    setErrors({});
  };

  const handleDelete = (skill) => {
    if (!window.confirm(`¿Eliminar la habilidad "${skill.nombre}"?`)) return;
    setCvData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== skill.id) }));
    showToast(`Habilidad "${skill.nombre}" eliminada.`, "info");
    if (editingId === skill.id) resetForm();
  };

  const handleCancel = () => resetForm();

  return (
    <div className="form-section">
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}

      <form className="form form--skills" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Habilidades</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="skill-nombre">Nombre de la habilidad *</label>
          <input
            className={`form__input ${errors.nombre ? "form__input--error" : ""}`}
            id="skill-nombre"
            name="nombre"
            placeholder="Ej: JavaScript, React, Diseño UX..."
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="form__error">{errors.nombre}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="skill-categoria">Categoría</label>
          <select
            className="form__select"
            id="skill-categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="skill-nivel">
            Nivel de dominio: <strong>{form.nivel}%</strong>
          </label>
          <input
            className={`form__range ${errors.nivel ? "form__input--error" : ""}`}
            id="skill-nivel"
            name="nivel"
            type="range"
            min="0"
            max="100"
            step="5"
            value={form.nivel}
            onChange={handleChange}
          />
          {errors.nivel && <p className="form__error">{errors.nivel}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="skill-descripcion">Descripción breve</label>
          <input
            className="form__input"
            id="skill-descripcion"
            name="descripcion"
            placeholder="Ej: 2 años de experiencia en desarrollo frontend"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form__actions">
          <button className="form__button form__button--primary" type="submit">
            {editingId ? "Actualizar habilidad" : "Agregar habilidad"}
          </button>
          {editingId && (
            <button className="form__button form__button--secondary" type="button" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {cvData.skills.length > 0 && (
        <div className="list list--skills">
          <h3 className="list__title">Habilidades registradas ({cvData.skills.length})</h3>
          {cvData.skills.map(s => (
            <div className={`list__item ${editingId === s.id ? "list__item--editing" : ""}`} key={s.id}>
              <div className="list__item-info">
                <span className="list__item-name">{s.nombre}</span>
                {s.categoria && <span className="list__item-tag">{s.categoria}</span>}
                <span className="list__item-level">{s.nivel}%</span>
              </div>
              <div className="list__item-actions">
                <button className="list__button list__button--edit" onClick={() => handleEdit(s)}>Editar</button>
                <button className="list__button list__button--delete" onClick={() => handleDelete(s)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillForm;
