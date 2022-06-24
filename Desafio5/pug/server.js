const express = require('express');
const routes = require('./src/routes');
const path = require('path')
const app = express();
const port = 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);

//Seteamos pug
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');

//Configuramos el puerto a escuchar por el servidor
app.listen(port, (error) => {
    if (error)
        console.warn(`Error al iniciar el servidor: ${error}`);
    else
        console.info(`Servidor iniciado en el puerto ${port}`);
    });