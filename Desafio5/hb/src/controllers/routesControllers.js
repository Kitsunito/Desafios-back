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

// Listado de productos
const routeProducts = (req, res) => { 
    const productos = api.getProducts();
    res.render('products.hbs', {productos} )
}

//Sumar producto
const routePostProducts = (req, res) => {
    try {
        api.save(req.body);
        res.redirect('/');
        res.status(201).render;
    } catch (error) {
        console.log(`Se produjo un error: ${error}`);
        res.status(400).render;
    }

}

module.exports = {
    routeHome, routeProducts,  routePostProducts,
}