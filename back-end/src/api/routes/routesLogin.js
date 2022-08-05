const router = require('express').Router();

const { controllerLogin } = require('../controllers/controllerLogin');

// faltando middleware de validação (password, email)
router.post('/', controllerLogin);

module.exports = router;