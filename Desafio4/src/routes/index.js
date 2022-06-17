const { Router } = require('express');
const router = Router();
const Api = require('../api');

const api = new Api();

router.get("/productos", (req, res) => {
    try {
        res.json(api.getProducts());
    } catch (error) {
        res
            .status(error.statusCode ? error.statusCode : 500)
            .json({ error: error.message });
    }
});

router.get("/productos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = api.getProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res
            .status(error.statusCode ? error.statusCode : 500)
            .json({ error: error.message });
    }
});

router.post("/productos", (req, res) => {
    try {
        console.log(req);
        const { name, price, thumbnail } = req.body;
        api.save({name, price, thumbnail});
        res.sendStatus(201);
    } catch (error) {
        res
            .status(error.statusCode ? error.statusCode : 500)
            .json({ error: error.message });
    }

});

router.put("/productos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, price, thumbnail } = req.body;
        api.updateProduct(id, {name, price, thumbnail});
        res.sendStatus(200);
    } catch (error) {
        res
            .status(error.statusCode ? error.statusCode : 500)
            .json({ error: error.message });
    }
});

router.delete("/productos/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        api.deleteProduct(id);
        res.sendStatus(200);
    } catch (error) {
        res
            .status(error.statusCode ? error.statusCode : 500)
            .json({ error: error.message });
    }
});

module.exports = router;