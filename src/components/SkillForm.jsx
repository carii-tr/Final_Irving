import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import useFormValidation from "../hooks/useFormValidation";
import { v4 as uuid } from "uuid";

function SkillForm() {
  const { cvData, setCvData } = useContext(CVContext);
  const { validate } = useFormValidation();

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    nivel: 50,
    descripcion: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      categoria: "",
      nivel: 50,
      descripcion: ""
    });
    setEditingId(null);
    setErrors({});
  };

  const addSkill = (e) => {
    e.preventDefault();

    const validationErrors = validate("skill", form, cvData.skills);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: uuid(), ...form, nivel: Number(form.nivel) }]
    }));

    resetForm();
  };

  const editSkill = (skill) => {
    setForm(skill);
    setEditingId(skill.id);
  };

  const updateSkill = (e) => {
    e.preventDefault();

    const validationErrors = validate("skill", form, cvData.skills);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.id === editingId ? { ...s, ...form, nivel: Number(form.nivel) } : s
      )
    }));

    resetForm();
  };

  const deleteSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  return (
    <div className="form-section">
      <form className="form form--skills" onSubmit={editingId ? updateSkill : addSkill}>
        <h2 className="form__title">Skills</h2>

        <input className="form__input" name="nombre" value={form.nombre} onChange={handleChange} />
        {errors.nombre && <p className="form__error">{errors.nombre}</p>}

        <input className="form__input" name="categoria" value={form.categoria} onChange={handleChange} />

        <input className="form__input" name="nivel" type="number" value={form.nivel} onChange={handleChange} />
        {errors.nivel && <p className="form__error">{errors.nivel}</p>}

        <input className="form__input" name="descripcion" value={form.descripcion} onChange={handleChange} />

        <button className="form__button" type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <div className="list list--skills">
        {cvData.skills.map(s => (
          <div className="list__item" key={s.id}>
            <span>{s.nombre} - {s.nivel}%</span>

            <div className="list__actions">
              <button onClick={() => editSkill(s)}>Editar</button>
              <button onClick={() => deleteSkill(s.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillForm;