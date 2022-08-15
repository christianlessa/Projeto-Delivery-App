const serviceAdmin = require('../services/serviceAdmin');

const createUser = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;
    const newUser = await serviceAdmin.createUser({
      name,
      email,
      password,
      role,
    });
    return res.status(201).json(newUser);
  } catch (error) {
     next(error);
  }
};

const getAllUser = async (_req, res, next) => {
  try {
    const users = await serviceAdmin.getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceAdmin.deleteUser(id);
    return res.status(202).json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUser,
  deleteUser,
};