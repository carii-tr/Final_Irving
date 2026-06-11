import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function EducationForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    institucion: "",
    programa: "",
    periodo: "",
    descripcion: "",
    evidencia: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      evidencia: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const addEducation = (e) => {
    e.preventDefault();

    const validationErrors = validate("education", form, cvData.education);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { id: uuid(), ...form }]
    }));

    resetForm();
  };

  const editEducation = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const updateEducation = (e) => {
    e.preventDefault();

    const validationErrors = validate("education", form, cvData.education);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      education: prev.education.map(e =>
        e.id === editingId ? { ...e, ...form } : e
      )
    }));

    resetForm();
  };

  const deleteEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <form className="form form--education" onSubmit={editingId ? updateEducation : addEducation}>
        <h2 className="form__title">Educación</h2>

        <input className="form__input" name="institucion" value={form.institucion} onChange={handleChange} />
        {errors.institucion && <p className="form__error">{errors.institucion}</p>}

        <input className="form__input" name="programa" value={form.programa} onChange={handleChange} />
        {errors.programa && <p className="form__error">{errors.programa}</p>}

        <input className="form__input" name="periodo" value={form.periodo} onChange={handleChange} />
        {errors.periodo && <p className="form__error">{errors.periodo}</p>}

        <input className="form__input" name="descripcion" value={form.descripcion} onChange={handleChange} />

        <button className="form__button" type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list list--education">
        {cvData.education.map(e => (
          <div className="list__item" key={e.id}>
            <span>{e.institucion}</span>

            <div className="list__actions">
              <button onClick={() => editEducation(e)}>Editar</button>
              <button onClick={() => deleteEducation(e.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationForm;