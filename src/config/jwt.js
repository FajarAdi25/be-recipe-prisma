/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });

  // console.log(token);
  return token;
};

const refreshToken = (payload) => {
  const token = jwt.sign(payload, jwtSecretKey, {
    expiresIn: '3h',
  });
  // console.log(token);
  return token;
};

module.exports = { generateToken, refreshToken };
