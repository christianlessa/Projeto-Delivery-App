const router = require('express').Router();

const { controllerLogin } = require('../controllers/controllerLogin');

router.post('/login', controllerLogin);

module.exports = router;