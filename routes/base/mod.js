import { Router } from 'oak';
import { BaseController } from '@/routes/base/controller.js';

export function createRouter(table, mountPath) {
  const router = new Router();
  const controller = new BaseController(table);

  router.get('/:id', controller.show);
  router.get('/', controller.list);
  router.put('/:id', controller.update);
  router.post('/', controller.create);

  return router.use(`/${mountPath}`, router.routes());
}
