import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function LanguageForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    idioma: "",
    nivel: "",
    descripcion: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      idioma: "",
      nivel: "",
      descripcion: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const addLanguage = (e) => {
    e.preventDefault();

    const validationErrors = validate("language", form, cvData.languages);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: uuid(), ...form }]
    }));

    resetForm();
  };

  const editLanguage = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const updateLanguage = (e) => {
    e.preventDefault();

    const validationErrors = validate("language", form, cvData.languages);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(l =>
        l.id === editingId ? { ...l, ...form } : l
      )
    }));

    resetForm();
  };

  const deleteLanguage = (id) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <form className="form form--languages" onSubmit={editingId ? updateLanguage : addLanguage}>
        <h2 className="form__title">Idiomas</h2>

        <input className="form__input" name="idioma" value={form.idioma} onChange={handleChange} />
        {errors.idioma && <p className="form__error">{errors.idioma}</p>}

        <input className="form__input" name="nivel" value={form.nivel} onChange={handleChange} />
        {errors.nivel && <p className="form__error">{errors.nivel}</p>}

        <input className="form__input" name="descripcion" value={form.descripcion} onChange={handleChange} />

        <button className="form__button" type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list list--languages">
        {cvData.languages.map(l => (
          <div className="list__item" key={l.id}>
            <span>{l.idioma} - {l.nivel}</span>

            <div className="list__actions">
              <button onClick={() => editLanguage(l)}>Editar</button>
              <button onClick={() => deleteLanguage(l.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageForm;