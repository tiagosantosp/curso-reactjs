import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./css/ProjectForm.module.css";
import { useState, useEffect } from "react";
import dados from '../../data/db.json'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application-json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => setCategories(data))
    .catch(err => {
      setCategories(dados.categories);
    });

  }, [])

  const submit = (e) => {
     e.preventDefault()
    //  console.log(project)
     handleSubmit(project)
  }

  const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value})
  }

  const handleCategory = (e) => {
    setProject({...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text
    }})
  }
  
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select
        name="category_id"
        text="selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ProjectForm;
