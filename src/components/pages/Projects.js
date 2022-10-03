import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

import styles from './css/Projects.module.css'
import dados from '../../data/db.json'

const Projects = () => {

  const [projects, setprojects] = useState([]);
  const [removeLoading, setremoveLoading] = useState(false);
  const [projectMessage, setprojectMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setprojects(data)
        setremoveLoading(true)
      })
      .catch(err => {
        setprojects(dados.projects)
        setremoveLoading(true)
      })
  }, [])

  const location = useLocation()
  let message = ''
  if(location.state) message = location.state.message 

  const removeProject = id => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(resp => resp.json())
      .then(data => {
        setprojects(projects.filter(project => project.id !== id))
        setprojectMessage('Projeto removido com sucesso!')
      })
      .catch(err => console.log(err))
  }

  return (
  <div className={styles.project_container}>
    <div className={styles.title_container}>
      <h1>Meu Projetos</h1> 
      <LinkButton to="/newproject" text="Novo Projeto"/>
    </div>
    {message && <Message type="success" msg={message}/>}
    {projectMessage && <Message type="success" msg={projectMessage}/>}
    <Container customClass="start">
      {projects.length > 0 && 
        projects.map((project, id) => (
        <ProjectCard 
          id={project.id}
          key={id}  
          name={project.name}
          budget={project.budget}
          category={project.category.name}
          handleRemove={removeProject}
        />))
      } 
      {!removeLoading && <Loading/>}
      {removeLoading && projects.length === 0 && (
        <p>Não há projetos cadastrados</p>
      )}
    </Container>
  </div>
  )
}
 
export default Projects;