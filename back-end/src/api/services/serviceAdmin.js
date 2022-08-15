const md5 = require('md5');
const Joi = require('joi');
const model = require('../../database/models/index');

const USER = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

const createUser = async (data) => {
  const { error } = USER.validate(data);
  if (error) throw error;

  const { name, email, role, password } = data;
  const user = await model.user.findOne({ where: { email } });

  if (user) throw new Error('UserFound');

  const hashPassword = md5(password);
  const { id } = await model.user.create({ email, role, password: hashPassword, name });

  return { id };
};

const getAllUser = async () => {
  const users = await model.user.findAll();
  return users;
}

const deleteUser = async (id) => {
  const user = await model.user.findOne({ where: { id } });
  if (!user) throw new Error('UserNotFound');

  await model.user.destroy({ where: { id } });
}

module.exports = {
    createUser,
    getAllUser,
    deleteUser,
};
