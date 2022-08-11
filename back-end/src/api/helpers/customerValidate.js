const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);
    const notCustomer = decoded.role !== 'customer';
    if (!token || notCustomer) throw new Error('invalid token');
    req.user = decoded;
    next();
  } catch (error) {
    next({ message: 'invalid token' });
  }
};
