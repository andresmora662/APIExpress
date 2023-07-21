const express = require('express')
const router = express.Router()

const infoCursos = require('./cursos');
const programacion = infoCursos.programacion

//--- Obtener

router.get('/', (req,res)=>{
res.json(programacion)
})

//---- Objeto en particular 
router.get('/:id', (req,res)=>{
    const id = req.params.id
    const elemento = programacion.find(curso => curso.id === id)
    if(elemento){
        res.json(elemento)
    } else {
        res.status(404).json({ message: 'No se encontró el elemento'})
    }
})

//--- Postear
router.post('/', (req,res)=>{
    const nuevoElemento = req.body

    programacion.push(nuevoElemento)
    res.send(JSON.stringify(programacion))
})

//---Editar 

// --- Ruta obtener, obtener elemento especifico, editar, borrar, postear

router.put('/:id', (req,res)=>{
    const cursoActualizado = req.body
    console.log("cursoactualizado",cursoActualizado)
    const id = req.params.id
    console.log("id",id)

    programacion.findIndex(curso =>{
        console.log("curso", curso)
        if(curso.id === id){
            curso.titulo = cursoActualizado.titulo;
            curso.lenguaje = cursoActualizado.lenguaje;
            curso.nivel = cursoActualizado.nivel;
            curso.imagen = cursoActualizado.imagen;
        }
    })
    res.json(programacion)
 })

 //--- Borrar
 router.delete('/:id', (req,res) =>{
    const id = req.params.id
    const indice = programacion.findIndex(curso => curso.id === id)
  console.log("indice delete",indice); 

    if(indice >= 0){
        programacion.splice(indice,1);
    }

    res.json(programacion)
 })

 module.exports = router