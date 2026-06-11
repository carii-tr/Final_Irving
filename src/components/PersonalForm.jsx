import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";

function PersonalForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState(cvData.personal);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate("personal", form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showToast("Corrige los errores antes de guardar.", "error");
      return;
    }
    setCvData(prev => ({ ...prev, personal: form }));
    showToast("Datos personales guardados correctamente.");
  };

  return (
    <div className="form-section">
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      <form className="form form--personal" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title">Datos personales</h2>

        <div className="form__group">
          <label className="form__label" htmlFor="nombre">Nombre completo *</label>
          <input
            className={`form__input ${errors.nombre ? "form__input--error" : ""}`}
            id="nombre"
            name="nombre"
            placeholder="Ej: Ana García López"
            value={form.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <p className="form__error">{errors.nombre}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="profesion">Profesión o área *</label>
          <input
            className={`form__input ${errors.profesion ? "form__input--error" : ""}`}
            id="profesion"
            name="profesion"
            placeholder="Ej: Desarrollador Full Stack"
            value={form.profesion}
            onChange={handleChange}
          />
          {errors.profesion && <p className="form__error">{errors.profesion}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="ciudad">Ciudad *</label>
          <input
            className={`form__input ${errors.ciudad ? "form__input--error" : ""}`}
            id="ciudad"
            name="ciudad"
            placeholder="Ej: Guadalajara, México"
            value={form.ciudad}
            onChange={handleChange}
          />
          {errors.ciudad && <p className="form__error">{errors.ciudad}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="correo">Correo electrónico *</label>
          <input
            className={`form__input ${errors.correo ? "form__input--error" : ""}`}
            id="correo"
            name="correo"
            type="email"
            placeholder="Ej: ana@email.com"
            value={form.correo}
            onChange={handleChange}
          />
          {errors.correo && <p className="form__error">{errors.correo}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="telefono">Teléfono *</label>
          <input
            className={`form__input ${errors.telefono ? "form__input--error" : ""}`}
            id="telefono"
            name="telefono"
            placeholder="Ej: +52 33 1234 5678"
            value={form.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <p className="form__error">{errors.telefono}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="descripcion">Perfil profesional</label>
          <textarea
            className="form__textarea"
            id="descripcion"
            name="descripcion"
            placeholder="Breve descripción de tu perfil, experiencia y objetivos profesionales..."
            value={form.descripcion}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="github">GitHub</label>
          <input
            className={`form__input ${errors.github ? "form__input--error" : ""}`}
            id="github"
            name="github"
            placeholder="https://github.com/tu-usuario"
            value={form.github}
            onChange={handleChange}
          />
          {errors.github && <p className="form__error">{errors.github}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="linkedin">LinkedIn</label>
          <input
            className={`form__input ${errors.linkedin ? "form__input--error" : ""}`}
            id="linkedin"
            name="linkedin"
            placeholder="https://linkedin.com/in/tu-usuario"
            value={form.linkedin}
            onChange={handleChange}
          />
          {errors.linkedin && <p className="form__error">{errors.linkedin}</p>}
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="imagen">URL de imagen de perfil</label>
          <input
            className={`form__input ${errors.imagen ? "form__input--error" : ""}`}
            id="imagen"
            name="imagen"
            placeholder="https://ejemplo.com/foto.jpg"
            value={form.imagen}
            onChange={handleChange}
          />
          {errors.imagen && <p className="form__error">{errors.imagen}</p>}
          {form.imagen && !errors.imagen && (
            <img className="form__image-preview" src={form.imagen} alt="Vista previa" />
          )}
        </div>

        <button className="form__button form__button--primary" type="submit">
          Guardar datos personales
        </button>
      </form>
    </div>
  );
}

export default PersonalForm;
