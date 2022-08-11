const router = require('express').Router();

const { getIdSales } = require('../controllers/controllerSellers');
const validateJWT = require('../helpers/validateJWT');

router.get('/seller/orders', getIdSales);

module.exports = router;