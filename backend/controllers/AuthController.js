const User = require('../models/UserModel');
const { createAccessToken } = require('../utils/SecretToken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports.Signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ email, password });

    res
      .status(201)
      .json({ message: 'User registered successfully', success: true });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Couldn’t find your Zorvyn Account' });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const accessToken = createAccessToken(user._id, user.role);

    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    };

    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      success: true,
      token: accessToken,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out successfully', success: 'true' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


