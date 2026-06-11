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

  const maxLength = (value, max) =>
    !value || value.toString().trim().length <= max;

  const isNumberRange = (value, min, max) =>
    !isNaN(value) && Number(value) >= min && Number(value) <= max;

  const validate = (type, form, existingList = []) => {
    const errors = {};

    // ── PERSONAL ──────────────────────────────────────────
    if (type === "personal") {
      if (isEmpty(form.nombre)) {
        errors.nombre = "El nombre es obligatorio.";
      } else if (!minLength(form.nombre, 3)) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres.";
      } else if (!maxLength(form.nombre, 80)) {
        errors.nombre = "El nombre no puede exceder 80 caracteres.";
      }

      if (isEmpty(form.profesion)) {
        errors.profesion = "La profesión es obligatoria.";
      } else if (!minLength(form.profesion, 3)) {
        errors.profesion = "La profesión debe tener al menos 3 caracteres.";
      }

      if (isEmpty(form.ciudad)) {
        errors.ciudad = "La ciudad es obligatoria.";
      }

      if (isEmpty(form.telefono)) {
        errors.telefono = "El teléfono es obligatorio.";
      }

      if (isEmpty(form.correo)) {
        errors.correo = "El correo electrónico es obligatorio.";
      } else if (!isEmail(form.correo)) {
        errors.correo = "Ingresa un correo electrónico válido. Ej: nombre@dominio.com";
      }

      if (form.github && !isUrl(form.github)) {
        errors.github = "El enlace debe comenzar con http:// o https://";
      }

      if (form.linkedin && !isUrl(form.linkedin)) {
        errors.linkedin = "El enlace debe comenzar con http:// o https://";
      }

      if (form.imagen && !isUrl(form.imagen)) {
        errors.imagen = "La URL de imagen debe comenzar con http:// o https://";
      }
    }

    // ── SKILL ─────────────────────────────────────────────
    if (type === "skill") {
      if (isEmpty(form.nombre)) {
        errors.nombre = "El nombre de la habilidad es obligatorio.";
      } else if (!minLength(form.nombre, 2)) {
        errors.nombre = "El nombre debe tener al menos 2 caracteres.";
      } else {
        const duplicate = existingList.find(
          s => s.nombre.toLowerCase() === form.nombre.toLowerCase()
        );
        if (duplicate) {
          errors.nombre = `Ya existe una habilidad llamada "${form.nombre}".`;
        }
      }

      if (!isNumberRange(form.nivel, 0, 100)) {
        errors.nivel = "El nivel debe ser un valor entre 0 y 100.";
      }
    }

    // ── PROJECT ───────────────────────────────────────────
    if (type === "project") {
      if (isEmpty(form.nombre)) {
        errors.nombre = "El nombre del proyecto es obligatorio.";
      } else if (!minLength(form.nombre, 3)) {
        errors.nombre = "El nombre debe tener al menos 3 caracteres.";
      } else {
        const duplicate = existingList.find(
          p => p.nombre.toLowerCase() === form.nombre.toLowerCase()
        );
        if (duplicate) {
          errors.nombre = `Ya existe un proyecto llamado "${form.nombre}".`;
        }
      }

      if (isEmpty(form.descripcion)) {
        errors.descripcion = "La descripción del proyecto es obligatoria.";
      } else if (!minLength(form.descripcion, 10)) {
        errors.descripcion = "La descripción debe tener al menos 10 caracteres.";
      }

      if (!isUrl(form.repositorio)) {
        errors.repositorio = "El enlace debe comenzar con http:// o https://";
      }

      if (!isUrl(form.deploy)) {
        errors.deploy = "El enlace debe comenzar con http:// o https://";
      }
    }

    // ── EDUCATION ─────────────────────────────────────────
    if (type === "education") {
      if (isEmpty(form.institucion)) {
        errors.institucion = "La institución es obligatoria.";
      }

      if (isEmpty(form.programa)) {
        errors.programa = "El programa o certificación es obligatorio.";
      }

      if (isEmpty(form.periodo)) {
        errors.periodo = "El periodo es obligatorio.";
      }

      if (form.descripcion && !maxLength(form.descripcion, 300)) {
        errors.descripcion = "La descripción no puede exceder 300 caracteres.";
      }

      if (form.evidencia && !isUrl(form.evidencia)) {
        errors.evidencia = "El enlace debe comenzar con http:// o https://";
      }
    }

    // ── LANGUAGE ──────────────────────────────────────────
    if (type === "language") {
      if (isEmpty(form.idioma)) {
        errors.idioma = "El nombre del idioma es obligatorio.";
      } else if (!minLength(form.idioma, 2)) {
        errors.idioma = "El idioma debe tener al menos 2 caracteres.";
      }

      if (isEmpty(form.nivel)) {
        errors.nivel = "El nivel del idioma es obligatorio.";
      }

      if (form.descripcion && !minLength(form.descripcion, 3)) {
        errors.descripcion = "La descripción es muy corta.";
      }
    }

    return errors;
  };

  return { validate };
}
