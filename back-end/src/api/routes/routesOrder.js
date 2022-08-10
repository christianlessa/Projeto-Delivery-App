const router = require('express').Router();

const { createNewOrder, getAllSales, getSaleById } = require('../controllers/controllerOrders');
const validateJWT = require('../helpers/validateJWT');

router.post('/customer/orders', validateJWT, createNewOrder);
router.get('/customer/orders', getAllSales);
router.get('/customer/orders/:id', getSaleById);

module.exports = router;