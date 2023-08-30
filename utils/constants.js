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
const MESSAGE_CONFLICT_ERROR = 'Пользователь с такой почтой уже существует';
const MESSAGE_ERROR_BAD_REQUEST = 'При создании были переданны некорретные даные';
const MESSAGE_ERROR_NOT_FOUND = 'Данные не найдены';
const MESSAGE_SERVER_ERROR = 'На сервере произошла ошибка';
const MESSAGE_UNATHORIZED = 'Пользователь не авторизирован';
const MESSAGE_ERROR_FORBIDDEN = 'Не возможно удалить чужой фильм';
const SALT_HASH = 10;

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
  MESSAGE_CONFLICT_ERROR,
  MESSAGE_ERROR_BAD_REQUEST,
  MESSAGE_ERROR_NOT_FOUND,
  MESSAGE_SERVER_ERROR,
  MESSAGE_UNATHORIZED,
  MESSAGE_ERROR_FORBIDDEN,
  SALT_HASH,
};
