import { v4 as uuidv4 } from 'uuid';

import styles from "./css/Project.module.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceCard from "../service/ServiceCard";
import ServiceForm from "../service/ServiceForm";
import Message from "../layout/Message"
import dados from '../../data/db.json'

const Project = () => {
  let { id } = useParams();
  const [project, setproject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [showServiceForm, setShowServiceForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setproject(data)
        setServices(data.services)
      })
      .catch((err) => {
        setproject(dados.projects[id])
        setServices(dados.projects[id].services)
      });
  }, [id]);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  };
  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm);
  };

  const editPost = (project) => {
    setMessage('')
    if (project.budget < project.cost) {
        setMessage('O orçamento não pode ser menor que o custo do projeto!')
        setType('error')
        return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setproject(data)
        setShowProjectForm(false)
        setMessage('Projeto Atualizado!')
        setType('success')
      })
      .catch((err) => {
        dados.projects[project.id] = project
        setproject(project)
        setShowProjectForm(false)
        setMessage('Projeto Atualizado!')
        setType('success')
      });

  }
  const createService = (project) => {
    setMessage('')
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4();

    const lastServiceCost =  lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setproject(data)
        setServices(data.services)
        setShowProjectForm(false)
      })
      .catch((err) => console.log(err));

      id = project.id

  }

  const removeService = (id, cost) => {
    setMessage('')
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    )
    
    const projectUpdated = project

    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectUpdated)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setproject(data)
        setServices(data.services)
        setMessage('Serviço removido com sucesso')
        setType('success')
      })
      .catch((err) => console.log(err));

  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message}/>}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span>{" "}
                    {Number(project.budget).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>
                    <span>Total Utilizado: </span>{" "}
                    {Number(project.cost).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
              {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm 
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                <ServiceCard
                  id={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  key={service.id}
                  handleRemove={removeService}
                />
                ))
              }
              {services.length === 0 && <p>Não há serviços cadastrados</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
