import { Router } from 'oak';
import { show } from '@/routes/posts/controller.js';

const postsRouter = new Router();

postsRouter.get('/:id', show);

export { postsRouter };
