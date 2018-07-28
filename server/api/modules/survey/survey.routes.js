import { Router } from 'express';
import * as serveyHandler from './survey.handler';

export function init(api){
  const router = new Router();
  router.get('/', serveyHandler.getAllUsers);
  router.post('/', serveyHandler.createSurvey);

  api.use('/survey', router);
}
