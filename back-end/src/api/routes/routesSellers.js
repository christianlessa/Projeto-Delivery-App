const router = require('express').Router();

const { getSellerOrders, updateOrderStatus } = require('../controllers/controllerSellers');
// const sellerValidate = require('../helpers/sellerValidate');

router.post('/seller/orders/', getSellerOrders);
router.put('/seller/orders/', updateOrderStatus);

module.exports = router;
