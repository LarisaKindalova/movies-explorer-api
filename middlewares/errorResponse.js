const { INTERNAL_SERVER_ERROR, MESSAGE_SERVER_ERROR } = require('../utils/constants');

const errorResponse = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR
      ? MESSAGE_SERVER_ERROR
      : message,
  });
  next();
};

module.exports = errorResponse;
