import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import LanguageForm from "../components/LanguageForm";

function Editor() {
  return (
    <div className="container">

      <h1 className="title">Editor del CV</h1>

      <section className="section">
        <PersonalForm />
      </section>

      <section className="section">
        <SkillForm />
      </section>

      <section className="section">
        <ProjectForm />
      </section>

      <section className="section">
        <EducationForm />
      </section>

      <section className="section">
        <LanguageForm />
      </section>

    </div>
  );
}

export default Editor;