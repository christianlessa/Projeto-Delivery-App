const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) throw new Error('invalid token');

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    next({ message: 'invalid token' });
  }
};