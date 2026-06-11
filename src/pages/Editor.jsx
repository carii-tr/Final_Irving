import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import LanguageForm from "../components/LanguageForm";
import { Link } from "react-router-dom";

function Editor() {
  return (
    <div className="page page--editor">
      <div className="page__header">
        <h1 className="page__title">Editor del CV</h1>
        <p className="page__subtitle">
          Completa cada sección y guarda los cambios. Los datos se conservan al recargar la página.
        </p>
        <Link className="btn btn--secondary" to="/preview">
          Ver previsualización →
        </Link>
      </div>

      <div className="editor__sections">
        <section className="editor__section">
          <PersonalForm />
        </section>

        <section className="editor__section">
          <SkillForm />
        </section>

        <section className="editor__section">
          <ProjectForm />
        </section>

        <section className="editor__section">
          <EducationForm />
        </section>

        <section className="editor__section">
          <LanguageForm />
        </section>
      </div>
    </div>
  );
}

export default Editor;
