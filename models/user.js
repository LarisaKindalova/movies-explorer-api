const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors/unauthorized');
const {
  MIN_LENGTH_WORD, MAX_LENGTH_WORD, MESSAGE_ERROR_EMAIL, MESSAGE_ERROR_AUTH,
} = require('../utils/config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: MIN_LENGTH_WORD,
    maxlength: MAX_LENGTH_WORD,
    default: 'пользователь',
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: MESSAGE_ERROR_EMAIL,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(MESSAGE_ERROR_AUTH));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(MESSAGE_ERROR_AUTH));
          }
          return user;
        });
    });
};
// метод схемы удаление пароля из ответа
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
