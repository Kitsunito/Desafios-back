const express = require('express');
const {engine} = require('express-handlebars');
const routes = require('./src/routes');
const path = require('path');
const { Server: IOServer } = require('socket.io');
const app = express();
const port = 8080;
const ApiProducts = require('./src/apiProducts');
const ApiMessages = require('./src/apiMessages');
const messagesDB = require("./src/db/dbConnections").sqlite3Connection;
const productsDB = require("./src/db/dbConnections").mysqlConnection;

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

//----Websocket----
const apiProducts = new ApiProducts(productsDB, "product");
const apiMessages = new ApiMessages(messagesDB, "chat");
const io = new IOServer(expressServer);
io.on('connection', async (socket) => {

    console.info(`Nueva conexión: ${socket.id}`)

    //Products
    io.emit('server:products', await apiProducts.getProducts());
    socket.on('client:product', async product => {
        await apiProducts.save(product);
        io.emit('server:products', await apiProducts.getProducts());
    });

    //Chat
    io.emit('server:messages', await apiMessages.getAll());

    socket.on('client:message', async message => {
        await apiMessages.save(message);
        io.emit('server:messages', await apiMessages.getAll());
    });
})