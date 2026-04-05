const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.cookies?.accessToken; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Your token might be expired or invalid' });
  }
};

module.exports = isLoggedIn;
