import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
 const [getProducts, setProducts] = useState([])
 const [formProducts, setFormProducts] = useState({
  titulo:"",
  leguaje:"",
  nivel: "",
  imagen: "",
  id:0
 })

 //--- Obtener cursos/producto
 const getData = async() =>{
  const url = "http://localhost:5002/nuestroscursos"
  const response = await axios.get(url)
  const data = response.data
  setProducts(data)
 }

 //--- Publicar datos 
 const postData = async() =>{
  const url = "http://localhost:5002/nuestroscursos"
  const getDatosForm = {
    titulo: formProducts.titulo,
    lenguaje: formProducts.lenguaje,
    nivel: formProducts.nivel,
    id: formProducts.id
  }
  const response = await axios.post(url, getDatosForm)
  setFormProducts(response)
  getData();
 }

 //----Editar
 // 1.- Necesitan buscar u obtener el elemento especifico 
 // http://localhost:5002/nuestroscursos/${id}

 // 2- Actualizar ese elemento especifico con el nuevo dato 

//------------------
 // // 1.- Necesitan buscar u obtener el elemento especifico 
 // http://localhost:5002/nuestroscursos/${id}

 // 2- Generar cambio, obteniendo primero los valores del formulario

 // 3- generar la actualización del elemento especifico

//------------------
 //--- Borrar 
 const deleteData = async(id) =>{
  const url = `http://localhost:5002/nuestroscursos/${id}`
  await axios.delete(url)
  getData()
 }

 useEffect(()=>{
  getData()
 }, []); 

  return (
    <div>
      <form onSubmit={postData}>
      <input type="text" placeholder='Titulo' onChange={(e) => setFormProducts({...formProducts, titulo: e.target.value})}/>
      <input type="text" placeholder='Lenguaje' onChange={(e) => setFormProducts({...formProducts, lenguaje: e.target.value})}/>
      <input type="text" placeholder='Nivel' onChange={(e) => setFormProducts({...formProducts, nivel: e.target.value})}/>
      <input type="text" placeholder='imagen' onChange={(e) => setFormProducts({...formProducts, imagen: e.target.value})}/>
      <input type="number" placeholder='ID' onChange={(e) => setFormProducts({...formProducts, id: e.target.value})}/>
      <button>Enviar</button>
      </form>
     

      {getProducts.map(x =>
      <div key={x.id}>
        <h1>Titulo:{x.titulo}</h1>
        <h2>Lenguaje:{x.lenguaje}</h2>
        <h2>Nivel:{x.nivel}</h2>
        <img src={x.imagen}/>
        <button>Editar</button>
        <button onClick={()=> deleteData(x.id)}>Borrar</button>
      </div>
      )}

    </div>
  )
}

export default App
