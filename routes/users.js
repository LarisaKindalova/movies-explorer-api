const userRouter = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validate');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUpdateUser, updateUserInfo);

module.exports = userRouter;
