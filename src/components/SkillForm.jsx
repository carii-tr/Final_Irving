import { useContext, useState } from "react";
import { CVContext } from "../context/CVContext";
import { v4 as uuidv4 } from "uuid";

function SkillForm() {

  const { cvData, setCvData } = useContext(CVContext);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const duplicate = cvData.skills.find(
      skill =>
        skill.nombre.toLowerCase() ===
        nombre.toLowerCase()
    );

    if (duplicate) {
      alert("La habilidad ya existe");
      return;
    }

    const nuevaSkill = {
      id: uuidv4(),
      nombre,
      categoria,
      nivel: Number(nivel),
      descripcion
    };

    setCvData({
      ...cvData,
      skills: [...cvData.skills, nuevaSkill]
    });

    setNombre("");
    setCategoria("");
    setNivel("");
    setDescripcion("");
  };

  const deleteSkill = (id) => {

    setCvData({
      ...cvData,
      skills: cvData.skills.filter(
        skill => skill.id !== id
      )
    });
  };

  return (
    <div>

      <h2>Habilidades</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Nivel"
          min="1"
          max="100"
          value={nivel}
          onChange={(e) =>
            setNivel(e.target.value)
          }
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
          }
        />

        <button type="submit">
          Agregar habilidad
        </button>

      </form>

      <hr />

      {cvData.skills.map((skill) => (

        <div key={skill.id}>

          <h4>{skill.nombre}</h4>

          <p>{skill.categoria}</p>

          <p>{skill.nivel}%</p>

          <p>{skill.descripcion}</p>

          <button
            onClick={() =>
              deleteSkill(skill.id)
            }
          >
            Eliminar
          </button>

        </div>

      ))}

    </div>
  );
}

export default SkillForm;