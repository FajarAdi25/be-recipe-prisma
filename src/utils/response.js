/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const response = (res, result, status, message, pagination) => {
  const responseData = {};

  if (status >= 200 && status < 300) {
    responseData.status = "success";
  }
  responseData.statusCode = status;
  responseData.message = message || null;
  responseData.data = result || null;
  responseData.pagination = pagination || {};

  return res.status(status).json(responseData);
};

const responseError = (res, status, message) => {
  const responseData = {};

  if (status >= 400) {
    responseData.status = "error";
  }
  responseData.statusCode = status;
  responseData.message = message || null;
  return res.status(status).json(responseData);
};

module.exports = { response, responseError };
