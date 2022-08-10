const router = require('express').Router();

const { getAllProduct } = require('../controllers/controllerProducts');

router.get('/customer/products', getAllProduct);

module.exports = router;