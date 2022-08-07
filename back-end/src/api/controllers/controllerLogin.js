const serviceUser = require('../services/serviceLogin');

const controllerLogin = async (req, res, _next) => {
    try {
        const { email, password } = req.body;
        const newLogin = await serviceUser.loginValidator({ email, password });
        return res.status(200).json(newLogin);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = {
    controllerLogin,
};