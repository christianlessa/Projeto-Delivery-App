const md5 = require('md5');
const model = require('../../database/models/index');
const getToken = require('../helpers/getToken');

const loginValidator = async ({ email, password }) => {
    const hashPassword = md5(password);
    const checkUser = await model.user.findOne({
        where: { email, password: hashPassword },
    });

    if (!checkUser) {
        const message = 'Invalid login';
        throw new Error(message);
    }

    const user = {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        password: checkUser.password,
        role: checkUser.role,
    };

    const token = getToken(user);
    return {
        user: {
            id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            password: checkUser.password,
            role: checkUser.role,
        }, token
    }
}

module.exports = {
    loginValidator,
};