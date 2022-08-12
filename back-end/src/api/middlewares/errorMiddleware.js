const errors = (errorMessage) => {
  switch (errorMessage) {
    case 'Invalid login':
      return { status: 401, message: 'Incorrect email or password' };

    case 'SaleNotFound':
      return { status: 404, message: 'Sale or seller does not exist' };
      
    case 'UserFound':
      return { status: 409, message: 'User already registered' };
     
    case 'invalid token':
      return { status: 401, message: 'Expired or invalid token' };
      
    default: 
      return { status: 500, message: errorMessage };
  }
};

module.exports = (error, _req, res, _next) => {
  if (error.isJoi) {
    return res.status(400).json({ message: error.message });
  }

  const { status, message } = errors(error.message);
  return res.status(status).json({ message });
};
