const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
  try {
    const { email, password, role, isActive } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const userData = { email, password };
    if (role) userData.role = role;
    if (isActive !== undefined) userData.isActive = isActive;

    const user = await User.create(userData);

    // Return user without password
    const userResponse = await User.findById(user._id).select('-password');

    res.status(201).json({ message: 'User created successfully', success: true, user: userResponse });
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Return all users excluding passwords
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, password, role, isActive } = req.body;
    
    // We fetch the user first in case we need to update the password which requires save() hook for hashing
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email) {
      // Check if email is already taken by someone else
      const existingEmail = await User.findOne({ email, _id: { $ne: user._id } });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already in use by another user' });
      }
      user.email = email;
    }

    if (password) user.password = password;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');
    res.status(200).json({ message: 'User updated successfully', success: true, user: updatedUser });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Soft delete implementation
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'User deleted (deactivated) successfully', success: true });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
