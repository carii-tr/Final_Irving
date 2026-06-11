import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";

function PersonalForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState(cvData.personal);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate("personal", form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      personal: form
    }));
  };

  return (
    <form className="form form--personal" onSubmit={handleSubmit}>
      <h2 className="form__title">Datos personales</h2>

      <input
        className="form__input"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      {errors.nombre && <p className="form__error">{errors.nombre}</p>}

      <input
        className="form__input"
        name="profesion"
        placeholder="Profesión"
        value={form.profesion}
        onChange={handleChange}
      />
      {errors.profesion && <p className="form__error">{errors.profesion}</p>}

      <input
        className="form__input"
        name="ciudad"
        placeholder="Ciudad"
        value={form.ciudad}
        onChange={handleChange}
      />

      <input
        className="form__input"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
      />
      {errors.correo && <p className="form__error">{errors.correo}</p>}

      <input
        className="form__input"
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
      />

      <textarea
        className="form__textarea"
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        className="form__input"
        name="github"
        placeholder="GitHub"
        value={form.github}
        onChange={handleChange}
      />

      <input
        className="form__input"
        name="linkedin"
        placeholder="LinkedIn"
        value={form.linkedin}
        onChange={handleChange}
      />

      <input
        className="form__input"
        name="imagen"
        placeholder="URL imagen"
        value={form.imagen}
        onChange={handleChange}
      />

      <button className="form__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

export default PersonalForm;