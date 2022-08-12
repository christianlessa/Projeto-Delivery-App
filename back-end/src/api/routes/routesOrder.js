const router = require('express').Router();

const {
    createNewOrder,
    getAllSales,
    getSaleById,
    getAllOrderByUserId,
} = require('../controllers/controllerOrders');

const customerValidate = require('../helpers/customerValidate');

router.post('/customer/checkout', customerValidate, createNewOrder);
router.post('/customer/orders', getAllOrderByUserId);
router.get('/customer/orders', customerValidate, getAllSales);
router.get('/customer/orders/:id', customerValidate, getSaleById);

module.exports = router;
