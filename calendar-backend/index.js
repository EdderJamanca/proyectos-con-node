
// requerir express
const express = require('express');
const {bdConection}=require('./database/config');
const  cors = require('cors');

// trayendo las variables de entorno con dotenv
require('dotenv').config();

// console.log(process.env.PORT)
// crear el servidor de expres
const app=express();

// la conecion de la base de datos 
bdConection();

// habilitar CROS() A nivel basico
app.use(cors());
// Habilidanto el directorio estatico
app.use(express.static('public'));

// lectura y posteo del body - la lectura de los json
app.use(express.json())

// rutas
// aqui estamos ponientos las rutas
// use {get post delete update}
app.use('/api/auth',require('./routes/auth'));

// EMPOIT DE EVENTOS DEL CALENDARIO
app.use('/api/events',require('./routes/events-router'));


// levantar el servidor y asignando el puerto
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})