const router = require('express').Router();

const { getAllProduct } = require('../controllers/controllerProducts');

router.get('/', getAllProduct);

module.exports = router;