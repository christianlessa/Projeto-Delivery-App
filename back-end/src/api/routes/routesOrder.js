const router = require('express').Router();

const { createNewOrder } = require('../controllers/controllerOrders');
const validateJWT = require('../helpers/validateJWT');

router.post('/', validateJWT, createNewOrder);

module.exports = router;