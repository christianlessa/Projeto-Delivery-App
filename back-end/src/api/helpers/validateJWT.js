const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    next({ status: 401, message: 'Expired or invalid token' });
  }
};