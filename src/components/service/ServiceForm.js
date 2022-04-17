import styles from '../project/css/ProjectForm.module.css'

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

import { useState } from 'react';


const ServiceForm = ({handleSubmit, btnText, projectData}) => {

  const [service, setService] = useState({});

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  const handleChange = (e) => {
    setService({...service, [e.target.name]: e.target.value})
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input 
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="insira o valor total"
        handleOnChange={handleChange}
      />
      <Input 
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} /> 
    </form>
  )
}
 
export default ServiceForm;