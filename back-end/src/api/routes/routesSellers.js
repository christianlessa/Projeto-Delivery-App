const router = require('express').Router();

const { getSellerSales } = require('../controllers/controllerSellers');
const sellerValidate = require('../helpers/sellerValidate');

router.get('/seller/orders/:id', sellerValidate, getSellerSales);

module.exports = router;
