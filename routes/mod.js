import { Router } from 'oak';
import { router as postsRouter } from '@/routes/forum/posts/mod.js';

const router = new Router();

router.use('/posts', postsRouter.routes());

export { router };
