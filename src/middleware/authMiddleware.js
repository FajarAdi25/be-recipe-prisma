/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { responseError } = require('../helpers/response');

const jwtSecretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
      throw new Error('unauthorized');
    }

    const token = authToken.split(' ')[1];
    const decode = jwt.verify(token, jwtSecretKey);

    req.payload = decode;
    next();
  } catch (error) {
    responseError(res, 401, error.message);
  }
};
module.exports = authMiddleware;
