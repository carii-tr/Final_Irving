import { useContext } from "react";
import { CVContext } from "../context/CVContext";

function PersonalForm() {

  const { cvData, setCvData } = useContext(CVContext);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setCvData({
      ...cvData,

      personal: {
        ...cvData.personal,
        [name]: value
      }
    });
  };

  return (
    <div>

      <h2>Datos Personales</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={cvData.personal.nombre}
        onChange={handleChange}
      />

      <input
        type="text"
        name="profesion"
        placeholder="Profesión"
        value={cvData.personal.profesion}
        onChange={handleChange}
      />

      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={cvData.personal.ciudad}
        onChange={handleChange}
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={cvData.personal.correo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={cvData.personal.telefono}
        onChange={handleChange}
      />

      <textarea
        name="descripcion"
        placeholder="Perfil profesional"
        value={cvData.personal.descripcion}
        onChange={handleChange}
      />

      <input
        type="url"
        name="github"
        placeholder="GitHub"
        value={cvData.personal.github}
        onChange={handleChange}
      />

      <input
        type="url"
        name="linkedin"
        placeholder="LinkedIn"
        value={cvData.personal.linkedin}
        onChange={handleChange}
      />

      <input
        type="url"
        name="imagen"
        placeholder="URL de imagen"
        value={cvData.personal.imagen}
        onChange={handleChange}
      />

      {cvData.personal.imagen && (
        <img
          src={cvData.personal.imagen}
          alt="Perfil"
          width="120"
        />
      )}

    </div>
  );
}

export default PersonalForm;