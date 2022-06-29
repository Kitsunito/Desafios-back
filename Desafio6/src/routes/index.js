const {Router} = require('express');
const router = Router();
const {routeHome, routeProducts, routePostProducts }  = require('../controllers/routesControllers')

router.get('/', routeHome);

router.get("/products", routeProducts);

router.post("/", routePostProducts);

module.exports = router;