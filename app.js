require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const helmet = require('helmet'); // https://expressjs.com/ru/advanced/best-practice-security.html

const { PORT, MONGO_DB, LIMITER } = require('./utils/config');

const errorResponse = require('./middlewares/errorResponse');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(LIMITER);
app.use(helmet());
app.use(router);

mongoose.connect(MONGO_DB)
  .then(() => { console.log('БД подключена'); })
  .catch(() => { console.log('Не удалось подключится к БД'); });

app.use(errors());
app.use(errorResponse); // Централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
