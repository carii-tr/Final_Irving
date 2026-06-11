// ===============================
// VALIDACIONES GENERALES
// ===============================

// EMAIL
export const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

// URL (GitHub, LinkedIn, repo, deploy)
export const isURLValid = (url) => {
    if (!url || url.trim() === "") return true; // opcional
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// TEXTO OBLIGATORIO
export const isRequired = (value) => {
    return value && value.trim().length > 0;
};

// LONGITUD MÍNIMA
export const minLength = (value, min) => {
    return value && value.trim().length >= min;
};

// NIVEL DE HABILIDAD (1-100)
export const isSkillLevelValid = (level) => {
    return level >= 1 && level <= 100;
};

// ===============================
// DUPLICADOS
// ===============================

// SKILLS duplicadas por nombre
export const isDuplicateSkill = (skills, name) => {
    return skills.some(
        (s) => s.nombre.toLowerCase() === name.toLowerCase()
    );
};

// PROJECTS duplicados por nombre
export const isDuplicateProject = (projects, name) => {
    return projects.some(
        (p) => p.nombre.toLowerCase() === name.toLowerCase()
    );
};