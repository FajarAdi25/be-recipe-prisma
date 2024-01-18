/* eslint-disable linebreak-style */
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
  const token = jwt.sign(
    {
      payload,
    },
    jwtSecretKey,

    { expiresIn: '3h' },
  );
  // console.log(token);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, jwtSecretKey);

  return decoded;
};

module.exports = { generateToken, refreshToken, verifyToken };
