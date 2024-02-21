/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { responseError } = require("../utils/response");

const jwtSecretKey = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];
    const decode = jwt.verify(token, jwtSecretKey);
    req.payload = decode;
    next();
  } catch (error) {
    if (error && error.name === "JsonWebTokenError") {
      return responseError(res, 404, "Invalid Token");
    }
    if (error && error.name === "TokenExpiredError") {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return responseError(
          res,
          404,
          "Refresh token not found. Please login again"
        );
      }
      jwt.verify(refreshToken, jwtSecretKey, (err, payload) => {
        if (err) {
          return responseError(res, 400, "Token expired");
        }
        const newToken = jwt.sign({ payload }, jwtSecretKey);
        res.setHeader("Authorization", `Bearer ${newToken}`);
        req.payload = jwt.verify(newToken, jwtSecretKey);
        next();
      });
    }
  }
};

module.exports = authMiddleware;
