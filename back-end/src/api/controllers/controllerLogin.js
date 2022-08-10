const serviceUser = require('../services/serviceLogin');

const controllerLogin = async (req, res, next) => {
    try {
        const data = req.body;
        const newLogin = await serviceUser.loginValidator(data);
        return res.status(200).json(newLogin);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    controllerLogin,
};