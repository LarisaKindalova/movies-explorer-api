// const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const MIN_LENGTH_WORD = 2;
const MAX_LENGTH_WORD = 30;

const MESSAGE_ERROR_EMAIL = 'Некорректный адрес почты';
const MESSAGE_ERROR_AUTH = 'Неправильные почта или пароль';
const MESSAGE_ERROR_URL = 'Не верный адрес';

module.exports = {
  CREATE,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  MIN_LENGTH_WORD,
  MAX_LENGTH_WORD,
  MESSAGE_ERROR_EMAIL,
  MESSAGE_ERROR_AUTH,
  MESSAGE_ERROR_URL,
};
