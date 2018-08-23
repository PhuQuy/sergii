import { Router } from 'express';
import * as orderHandler from './order.handler';

export function init(api){
  const router = new Router();
  router.get('/', orderHandler.getAllOrders);

  api.use('/order', router);
}
