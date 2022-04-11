import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from './css/Projects.module.css'
import Container from '../layout/Conatiner'
import LinkButton from '../layout/LinkButton'
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

const Projects = () => {

  const [projects, setprojects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setprojects(data)
      })
      .catch(err => console.log(err))
  }, [])

  const location = useLocation()
  let message = ''
  if(location.state) message = location.state.message 

  return (
  <div className={styles.project_container}>
    <div className={styles.title_container}>
      <h1>Meu Projetos</h1> 
      <LinkButton to="/newproject" text="Novo Projeto"/>
    </div>
    {message && <Message type="success" msg={message}/>}
    <Container customClass="start">
      {projects.length > 0 && 
        projects.map(project => (
        <ProjectCard 
          id={project.id}
          key={project.id}  
          name={project.name}
          budget={project.budget}
          category={project.category.name}
        />))
      }
    </Container>
  </div>
  )
}
 
export default Projects;