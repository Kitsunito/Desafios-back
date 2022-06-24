const express = require('express');
const {engine} = require('express-handlebars');
const routes = require('./src/routes');
const path = require('path')
const app = express();
const port = 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);


//Seteamos handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './src/views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './src/views/layout'),
    partialsDir: path.join(__dirname, './src/views/partials')
}));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'hbs');


//Configuramos el puerto a escuchar por el servidor
app.listen(port, (error) => {
    if (error)
        console.warn(`Error al iniciar el servidor: ${error}`);
    else
        console.info(`Servidor iniciado en el puerto ${port}`);
    });