const router = require('express').Router();

const { controllerRegister } = require('../controllers/controllerRegister');

router.post('/', controllerRegister);

module.exports = router;