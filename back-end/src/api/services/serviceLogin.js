const md5 = require('md5');
const Joi = require('joi');
const model = require('../../database/models/index');
const getToken = require('../helpers/getToken');

const USER = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidator = async (data) => {
  const { error } = USER.validate(data);
  if (error) throw error;

  const { email, password } = data;
  const hashPassword = md5(password);
  const checkUser = await model.user.findOne({ where: { email, password: hashPassword } });
  
  if (!checkUser) throw new Error('Invalid login');
  
  const { role, name, id } = checkUser;
  const token = getToken(checkUser.dataValues);
  return { id, name, email, role, token };
};

module.exports = {
    loginValidator,
};