const router = require('express').Router();

const { getSellerSales, updateStatus } = require('../controllers/controllerSellers');
const sellerValidate = require('../helpers/sellerValidate');

router.get('/seller/orders/:id', sellerValidate, getSellerSales);
router.put('/seller/orders/', updateStatus);

module.exports = router;
