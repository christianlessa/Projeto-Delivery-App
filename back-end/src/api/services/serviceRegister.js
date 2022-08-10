const md5 = require('md5');
const model = require('../../database/models/index');
const getToken = require('../helpers/getToken');

const createUser = async (data) => {
    const { name, email, role, password } = data;
    const user = await model.user.findOne({ where: { email } });

    if (user) throw new Error('UserNotFound');

    const hashPassword = md5(password);
    const { id } = await model.user.create({ email, role, password: hashPassword, name });

    const token = getToken({ name, email, role, password });

    return { id, token };
};

module.exports = {
    createUser,
};