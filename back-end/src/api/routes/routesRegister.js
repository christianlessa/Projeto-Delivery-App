const router = require('express').Router();

const { controllerRegister } = require('../controllers/controllerRegister');

router.post('/register', controllerRegister);

module.exports = router;