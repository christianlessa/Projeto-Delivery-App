const router = require('express').Router();

const {
    createNewOrder,
    getAllSales,
    getSaleById,
    getAllOrderByUserId,
    updateStatus,
} = require('../controllers/controllerOrders');

const customerValidate = require('../helpers/customerValidate');

router.post('/customer/checkout', customerValidate, createNewOrder);
router.post('/customer/orders', getAllOrderByUserId);
router.get('/customer/orders', customerValidate, getAllSales);
router.get('/customer/orders/:id', customerValidate, getSaleById);
router.put('/customer/orders/:id', customerValidate, updateStatus);

module.exports = router;
