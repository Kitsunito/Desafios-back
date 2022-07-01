const Api = require('../api');
const api = new Api();

//Página inicial
const routeHome = (req, res) => {
    try {
        res.render('home.hbs');
    } catch (error) {
        console.log(`Error: ${error}`);
        res.sendStatus(404);
    }
}



//Sumar producto
const routePostProducts = (req, res) => {
    try {
        api.save(req.body);
        res.status(201).render;
    } catch (error) {
        console.log(`Se produjo un error: ${error}`);
        res.status(400).render;
    }

}

module.exports = {
    routeHome, routePostProducts,
}