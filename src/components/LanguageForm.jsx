import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

const NIVELES = ["A1 - Básico", "A2 - Elemental", "B1 - Intermedio", "B2 - Intermedio alto", "C1 - Avanzado", "C2 - Dominio", "Nativo"];

function LanguageForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({ idioma: "", nivel: "", descripcion: "" });
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
    setForm({ idioma: "", nivel: "", descripcion: "" });
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listToValidate = editingId
      ? cvData.languages.filter(l => l.id !== editingId)
      : cvData.languages;
    const validationErrors = validate("language", form, listToValidate);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (editingId) {
      setCvData(prev => ({
        ...prev,
        languages: prev.languages.map(l => l.id === editingId ? { ...l, ...form } : l),
      }));
      showToast(`Idioma "${form.idioma}" actualizado.`);
    } else {
      setCvData(prev => ({
        ...prev,
        languages: [...prev.languages, { id: uuid(), ...form }],
      }));
      showToast(`Idioma "${form.idioma}" agregado.`);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setErrors({});
  };

  const handleDelete = (item) => {
    if (!window.confirm(`¿Eliminar el idioma "${item.idioma}"?`)) return;
    setCvData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== item.id) }));
    showToast(`Idioma "${item.idioma}" eliminado.`, "info");
    if (editingId === item.id) resetForm();
  };

  return (
    <div className="form-section">
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}

      <form className="form form--languages" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Idiomas</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="lang-idioma">Idioma *</label>
          <input
            className={`form__input ${errors.idioma ? "form__input--error" : ""}`}
            id="lang-idioma"
            name="idioma"
            placeholder="Ej: Español, Inglés, Francés..."
            value={form.idioma}
            onChange={handleChange}
          />
          {errors.idioma && <p className="form__error">{errors.idioma}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="lang-nivel">Nivel *</label>
          <select
            className={`form__select ${errors.nivel ? "form__input--error" : ""}`}
            id="lang-nivel"
            name="nivel"
            value={form.nivel}
            onChange={handleChange}
          >
            <option value="">Selecciona un nivel</option>
            {NIVELES.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.nivel && <p className="form__error">{errors.nivel}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="lang-descripcion">Descripción o certificación</label>
          <input
            className={`form__input ${errors.descripcion ? "form__input--error" : ""}`}
            id="lang-descripcion"
            name="descripcion"
            placeholder="Ej: TOEFL 95, Curso en Duolingo..."
            value={form.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && <p className="form__error">{errors.descripcion}</p>}
        </div>

        <div className="form__actions">
          <button className="form__button form__button--primary" type="submit">
            {editingId ? "Actualizar idioma" : "Agregar idioma"}
          </button>
          {editingId && (
            <button className="form__button form__button--secondary" type="button" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {cvData.languages.length > 0 && (
        <div className="list list--languages">
          <h3 className="list__title">Idiomas registrados ({cvData.languages.length})</h3>
          {cvData.languages.map(l => (
            <div className={`list__item ${editingId === l.id ? "list__item--editing" : ""}`} key={l.id}>
              <div className="list__item-info">
                <span className="list__item-name">{l.idioma}</span>
                <span className="list__item-tag">{l.nivel}</span>
              </div>
              <div className="list__item-actions">
                <button className="list__button list__button--edit" onClick={() => handleEdit(l)}>Editar</button>
                <button className="list__button list__button--delete" onClick={() => handleDelete(l)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageForm;
