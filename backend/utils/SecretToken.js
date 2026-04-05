require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.createAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h',
  });
};