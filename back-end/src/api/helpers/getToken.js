const fs = require('fs');

const jwt = require('jsonwebtoken');

const secret = fs.readFileSync('src/jwt.evaluation.key', 'utf8');

const jwtConfig = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const getToken = ({ id, name, email, password, role }) =>
  jwt.sign({ id, name, email, password, role }, secret, jwtConfig);

module.exports = getToken;