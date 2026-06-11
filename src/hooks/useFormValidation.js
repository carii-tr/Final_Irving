export default function useFormValidation() {

    const isEmpty = (value) =>
        value === undefined || value === null || value.toString().trim() === "";

    const isEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isUrl = (url) => {
        if (!url || url.trim() === "") return true;
        return /^(https?:\/\/)/.test(url);
    };

    const minLength = (value, min) =>
        value && value.toString().trim().length >= min;

    const validate = (type, form, existingList = []) => {
        let errors = {};

        // ================= PERSONAL =================
        if (type === "personal") {
            if (isEmpty(form.nombre)) errors.nombre = "Nombre obligatorio";
            if (!minLength(form.nombre, 3)) errors.nombre = "Mínimo 3 caracteres";

            if (isEmpty(form.profesion)) errors.profesion = "Profesión obligatoria";

            if (!isEmail(form.correo)) errors.correo = "Correo inválido";
        }

        // ================= SKILL =================
        if (type === "skill") {
            if (isEmpty(form.nombre)) {
                errors.nombre = "Skill obligatoria";
            } else {
                const duplicate = existingList.find(
                    s => s.nombre.toLowerCase() === form.nombre.toLowerCase()
                );

                if (duplicate) {
                    errors.nombre = "Skill duplicada";
                }
            }

            if (form.nivel < 0 || form.nivel > 100) {
                errors.nivel = "Nivel debe ser 0-100";
            }
        }

        // ================= PROJECT =================
        if (type === "project") {
            if (isEmpty(form.nombre)) {
                errors.nombre = "Proyecto obligatorio";
            } else {
                const duplicate = existingList.find(
                    p => p.nombre.toLowerCase() === form.nombre.toLowerCase()
                );

                if (duplicate) {
                    errors.nombre = "Proyecto duplicado";
                }
            }

            if (!minLength(form.nombre, 3)) {
                errors.nombre = "Mínimo 3 caracteres";
            }

            if (!isUrl(form.repositorio)) errors.repositorio = "URL inválida";
            if (!isUrl(form.deploy)) errors.deploy = "URL inválida";
        }
        
        // ================= EDUCATION =================
        if (type === "education") {
            if (isEmpty(form.institucion)) errors.institucion = "Obligatorio";
            if (isEmpty(form.programa)) errors.programa = "Obligatorio";
            if (isEmpty(form.periodo)) errors.periodo = "Obligatorio";
        }

        // ================= LANGUAGE =================
        if (type === "language") {
            if (isEmpty(form.idioma)) errors.idioma = "Idioma obligatorio";
            if (isEmpty(form.nivel)) errors.nivel = "Nivel obligatorio";
        }

        return errors;
    };

    return { validate };
}