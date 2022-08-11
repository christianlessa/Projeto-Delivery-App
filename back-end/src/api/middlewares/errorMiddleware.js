const errors = (errorMessage) => {
  switch (errorMessage) {
    case 'Invalid login':
      return { status: 401, message: 'Incorrect email or password' };

    case 'empty field':
      return { status: 400, message: 'All fields must be filled' };
      
    case 'UserNotFound':
      return { status: 409, message: 'User already registered' };
     
    case 'invalid token':
      return { status: 401, message: 'Expired or invalid token' };
      
    default: 
      return { status: 500, message: errorMessage };
  }
};

module.exports = (error, _req, res, _next) => {
  const { status, message } = errors(error.message);
  return res.status(status).json({ message });
};
