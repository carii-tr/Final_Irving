import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";

function PersonalForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState(cvData.personal);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [imgError, setImgError] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    // Al cambiar la URL de imagen manualmente, resetear error de carga
    if (e.target.name === "imagen") setImgError(false);
  };

  // Maneja la carga de archivo desde el equipo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar que sea imagen
    if (!file.type.startsWith("image/")) {
      setErrors({ ...errors, imagen: "El archivo debe ser una imagen (JPG, PNG, WEBP...)." });
      return;
    }

    // Validar tamaño máximo 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, imagen: "La imagen no debe superar 5MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({ ...prev, imagen: ev.target.result }));
      setImgError(false);
      setErrors((prev) => ({ ...prev, imagen: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate("personal", form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showToast("Corrige los errores antes de guardar.", "error");
      return;
    }
    setCvData((prev) => ({ ...prev, personal: form }));
    showToast("Datos personales guardados correctamente.");
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, imagen: "" }));
    setImgError(false);
    setErrors((prev) => ({ ...prev, imagen: null }));
  };

  // Determina si la imagen actual es un base64 (subida) o URL externa
  const isBase64 = form.imagen && form.imagen.startsWith("data:");
  const hasValidImage = form.imagen && !imgError;

  return (
    <div className="form-section">
      {toast && (
        <div className={`toast toast--${toast.type}`}>{toast.message}</div>
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
            placeholder="Breve descripción de tu perfil, experiencia y objetivos..."
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

        {/* ── IMAGEN DE PERFIL ── */}
        <div className="form__group">
          <label className="form__label">Imagen de perfil</label>

          {/* Vista previa si hay imagen válida */}
          {hasValidImage && (
            <div className="form__image-wrapper">
              <img
                className="form__image-preview"
                src={form.imagen}
                alt="Vista previa de perfil"
                onError={() => setImgError(true)}
              />
              <button
                type="button"
                className="form__image-remove"
                onClick={handleRemoveImage}
                title="Eliminar imagen"
              >
                ✕
              </button>
            </div>
          )}

          {/* Si la URL falló al cargar */}
          {imgError && (
            <p className="form__error">No se pudo cargar la imagen. Verifica la URL o sube un archivo.</p>
          )}

          {/* Subir desde archivo */}
          <label className="form__file-label" htmlFor="imagen-file">
            📁 Subir desde mi equipo
            <input
              className="form__file-input"
              id="imagen-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <p className="form__hint">— o pega una URL —</p>

          <input
            className={`form__input ${errors.imagen ? "form__input--error" : ""}`}
            id="imagen"
            name="imagen"
            placeholder="https://ejemplo.com/foto.jpg"
            value={isBase64 ? "" : form.imagen}
            onChange={handleChange}
            disabled={isBase64}
          />
          {isBase64 && (
            <p className="form__hint">Imagen cargada desde archivo. Elimínala para usar una URL.</p>
          )}
          {errors.imagen && <p className="form__error">{errors.imagen}</p>}
        </div>

        <button className="form__button form__button--primary" type="submit">
          Guardar datos personales
        </button>
      </form>
    </div>
  );
}

export default PersonalForm;
