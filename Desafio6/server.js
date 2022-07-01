const express = require('express');
const {engine} = require('express-handlebars');
const routes = require('./src/routes');
const path = require('path');
const { Server: IOServer } = require('socket.io');
const app = express();
const port = 8080;
const Api = require('./src/api');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes);
app.use(express.static(path.join(__dirname, '/public')));

//Handlebars template
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './src/views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './src/views/layout'),
    partialsDir: path.join(__dirname, './src/views/partials')
}));
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'hbs');

//Seteamos el server para que escuche el puerto definido antes
const expressServer = app.listen(port, (error) => {
    if (error)
        console.warn(`Error: ${error}`);
    else
        console.info(`Servidor escuchando el puerto ${port}`);
});

//Websocket
const api = new Api();
console.log(api);
const io = new IOServer(expressServer);
io.on('connection', async (socket) => {

    console.info(`Nueva conexión: ${socket.id}`)

    io.emit('server:products', api.products);

    socket.on('client:product', async product => {
        api.save(product);
        console.log(api.products);
        io.emit('server:products', api.products);
    });
})