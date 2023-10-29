import { Router } from 'oak';

export function createRouter(controller, mountPath) {
  const router = new Router();

  router.get('/:id', controller.show.bind(controller));
  router.get('/', controller.list.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.post('/', controller.create.bind(controller));

  return router.use(`/${mountPath}`, router.routes());
}
