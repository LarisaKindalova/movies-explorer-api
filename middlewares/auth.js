const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized');
const { MESSAGE_UNATHORIZED } = require('../utils/constants');

const { JwtSecret } = require('../utils/config');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JwtSecret);
    console.log(payload);
  } catch (err) {
    return next(new Unauthorized(MESSAGE_UNATHORIZED));
  }
  req.user = payload;
  return next();
};
