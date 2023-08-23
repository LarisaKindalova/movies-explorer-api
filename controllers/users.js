const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATE, SALT_HASH, MESSAGE_CONFLICT_ERROR, MESSAGE_ERROR_BAD_REQUEST, MESSAGE_ERROR_NOT_FOUND,
} = require('../utils/constants');
const { JwtSecret } = require('../utils/config');
const { BadRequest } = require('../errors/bad_request');
const { NotFound } = require('../errors/not_found');
const { ConflictError } = require('../errors/conflict_err');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, SALT_HASH)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(CREATE).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(MESSAGE_CONFLICT_ERROR));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE_ERROR_BAD_REQUEST));
      }
      return next(err);
    });
};

// аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JwtSecret);
      console.log('userID', user._id);
      console.log(token);
      // прикрепляем к cookie
      res.cookie('jwt', token, {
        maxAge: '360000', // 7 дней
        httpOnly: true, // доступ к cookie в рамках http запроса
        sameSite: true,
      }).send({ token, email });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  console.log('req.user._id: ', req.user._id);
  User.findById(req.user._id)
    .orFail(new NotFound(MESSAGE_ERROR_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFound(MESSAGE_ERROR_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE_ERROR_BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports.logOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
};
