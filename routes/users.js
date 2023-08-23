const userRouter = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUserInfo);

module.exports = userRouter;
