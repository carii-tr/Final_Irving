import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [cvData, setCvData] = useLocalStorage(
    "cvData",
    initialCVData
  );

  return (
    <CVContext.Provider value={{ cvData, setCvData }}>
      {children}
    </CVContext.Provider>
  );
};