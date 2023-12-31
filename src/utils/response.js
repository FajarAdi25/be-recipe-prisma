const response = (res, result, status, message) => {
  const responseData = {};

  if (status >= 200 && status < 300) {
    responseData.status = 'success';
  }
  responseData.statusCode = status;
  responseData.message = message || null;
  responseData.data = result || null;

  return res.status(status).json(responseData);
};

const responseError = (res, status, message) => {
  const responseData = {};

  if (status >= 400) {
    responseData.status = 'error';
  }
  responseData.statusCode = status;
  responseData.message = message || null;
  return res.status(status).json(responseData);
};

module.exports = { response, responseError };
