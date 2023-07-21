const express = require('express')
const app = express()
const { productsController} = require('./apis')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/nuestroscursos', productsController)

app.get('/', (req,res) =>{
    res.send('Servidor vivo')
})


const PORT = 5002

app.listen(PORT, ()=>{
    console.log(`Servidor conectado al puerto ${PORT}`)
})
