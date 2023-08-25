const rateLimit = require('express-rate-limit');

const {
  PORT = 4000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const JwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'jwt-secret';

const LIMITER = rateLimit({ // Для защиты от DoS-атак
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  PORT, MONGO_DB, JWT_SECRET, NODE_ENV, LIMITER, JwtSecret,
};
