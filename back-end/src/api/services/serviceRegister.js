const md5 = require('md5');
const Joi = require('joi');
const model = require('../../database/models/index');
const getToken = require('../helpers/getToken');

const USER = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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

  const token = getToken({ name, email, role, password });

  return { id, token };
};

module.exports = {
    createUser,
};
