const router = require('express').Router();
const userRouter = require('./users');
// const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
// const { NotFound } = require('../errors/not_found');
const { createUser, login, logOut } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
// router.use('/movies', movieRouter);

router.use('/signout', logOut);

// router.use('*', auth, (req, res, next) => {
//   next(new NotFound('Ошибка. Старница не найдена'));
// });

module.exports = router;
