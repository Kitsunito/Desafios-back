const {Router} = require('express');
const router = Router();
const {routeHome, routePostProducts }  = require('../controllers/routesControllers')

router.get('/', routeHome);

router.post("/", routePostProducts);

module.exports = router;