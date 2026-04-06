const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : undefined);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check if the user exists and is active
    const user = await User.findById(decoded.id);
    if (!user) {
      res.clearCookie('accessToken');
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.isActive === false) {
      res.clearCookie('accessToken');
      return res.status(403).json({ message: 'Forbidden: Your account has been disabled' });
    }

    // Attach basic info needed by downstream middleware (like roleMiddleware)
    req.user = { userId: user._id, role: user.role };
    console.log("AUTH HEADER:", req.headers.authorization);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Your token might be expired or invalid' });
  }
};

module.exports = isLoggedIn;
