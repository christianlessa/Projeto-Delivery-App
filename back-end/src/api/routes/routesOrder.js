const router = require('express').Router();

const { createNewOrder, getAllSales, getSaleById } = require('../controllers/controllerOrders');
const customerValidate = require('../helpers/customerValidate');

router.post('/customer/checkout', customerValidate, createNewOrder);
router.get('/customer/orders', customerValidate, getAllSales);
router.get('/customer/orders/:id', customerValidate, getSaleById);

module.exports = router;
