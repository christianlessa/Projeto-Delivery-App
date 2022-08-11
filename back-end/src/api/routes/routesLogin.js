const router = require('express').Router();

const { controllerLogin } = require('../controllers/controllerLogin');

// faltando middleware de validação (password, email)
router.post('/login',  controllerLogin);

module.exports = router;