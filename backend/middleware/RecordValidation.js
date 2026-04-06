const Joi = require('joi');

module.exports.CreateRecordValidation = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required().messages({
      'number.base': 'Amount must be a number',
      'number.positive': 'Amount must be a positive number',
      'any.required': 'Amount is required'
    }),
    type: Joi.string().valid('INCOME', 'EXPENSE').required().messages({
      'any.only': 'Type must be either INCOME or EXPENSE',
      'any.required': 'Type is required'
    }),
    category: Joi.string().trim().required().messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required'
    }),
    date: Joi.date().iso().required().messages({
      'date.base': 'Date must be a valid ISO date',
      'any.required': 'Date is required'
    }),
    notes: Joi.string().trim().optional().allow('')
  }).unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
