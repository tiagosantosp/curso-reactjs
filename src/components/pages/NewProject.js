import { useHistory } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './css/NewProject.module.css'
import dados from '../../data/db.json'

const NewProject = () => {

  const history = useHistory()

  const createPost = project => {

    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects",  {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        history.push('/projects', { message: 'Projeto criado com sucesso'})
      })
      .catch(err => {
        project.id = dados.projects.length + 1
        dados.projects.push(project)
        history.push('/projects', { message: 'Projeto criado com sucesso'})
      })
  }

  return (
  <div className={styles.newproject_container}>
    <h1>Criar projeto</h1>
    <p>crie seu projeto para depois adicionar os serviços</p>
    <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
  </div>
  )
}
 
export default NewProject;