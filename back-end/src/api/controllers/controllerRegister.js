const serviceRegister = require('../services/serviceRegister');

const controllerRegister = async (req, res, _next) => {
    try {
        const { name, email, role, password } = req.body;
        const createUser = await serviceRegister.createUser({
            name,
            email,
            password,
            role: role || 'customer',
        });
        return res.status(201).json(createUser);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

module.exports = {
    controllerRegister,
};