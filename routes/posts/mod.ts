import { Router } from 'oak';
import { show } from '@/routes/posts/controller.ts';

const postsRouter = new Router();

postsRouter.get('/:id', show);
// postsRouter.post('/', post);

export { postsRouter };
