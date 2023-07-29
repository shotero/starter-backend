import { Router } from 'oak';
import { post, show } from '@/routes/posts/controller.ts';

const postsRouter = new Router();

postsRouter.get('/:id', show);
postsRouter.post('/', post);

export { postsRouter };
