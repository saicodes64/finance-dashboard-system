const Joi = require('joi');

// Signup Validation
module.exports.SignupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(8).max(20).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot exceed 20 characters',
    }),
  }).unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Login Validation
module.exports.LoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().min(8).max(20).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot exceed 20 characters',
    }),
  }).unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};


