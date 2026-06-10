import { createContext, useEffect, useState } from "react";

export const CVContext = createContext();

const initialCVData = {
  personal: {
    nombre: "",
    profesion: "",
    ciudad: "",
    correo: "",
    telefono: "",
    descripcion: "",
    github: "",
    linkedin: "",
    imagen: ""
  },
  skills: [],
  projects: [],
  education: [],
  languages: []
};

export const CVProvider = ({ children }) => {

  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem("cvData");
      return saved ? JSON.parse(saved) : initialCVData;
    } catch (err) {
      return initialCVData;
    }
  });

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  return (
    <CVContext.Provider value={{ cvData, setCvData }}>
      {children}
    </CVContext.Provider>
  );
};