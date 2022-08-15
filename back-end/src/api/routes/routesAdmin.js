const router = require('express').Router();

const { createUser, getAllUser, deleteUser } = require('../controllers/controllerAdmin');

const adminValidate = require('../helpers/adminValidate');

router.get('/admin/manage', adminValidate, getAllUser);
router.post('/admin/manage', adminValidate, createUser);
router.delete('/admin/manage/:id', adminValidate, deleteUser);

module.exports = router;
