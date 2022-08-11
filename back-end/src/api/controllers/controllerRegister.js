const serviceRegister = require('../services/serviceRegister');

const controllerRegister = async (req, res, next) => {
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
     next(error);
  }
};

module.exports = {
  controllerRegister,
};