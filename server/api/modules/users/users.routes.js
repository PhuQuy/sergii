import { Router } from 'express';
import * as userHandler from './users.handler';
const authMiddleware = require("./../../authenticate");

export function init(api){
  const router = new Router();
  router.get('/', authMiddleware, userHandler.getAllUsers);
//   router.get('/', userHandler.getAllUsers);

  router.get('/:id', userHandler.getAllUserById);
  router.delete('/:id', userHandler.deleteUser);
  router.post('/check', userHandler.checkExistEmail);

  router.post('/email', userHandler.getAllUserByEmail);
  router.post('/forgot-passowrd', userHandler.forGotPassword);
  router.post('/reset-passowrd', userHandler.resetPassword);
  router.get('/survey/:id', userHandler.getAllUserBySurvey);

  router.post('/', userHandler.createUser);
  router.post('/login', userHandler.login);
  router.post('/logout', userHandler.logout);

  api.use('/users', router);
}
