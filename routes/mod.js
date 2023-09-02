import { Router } from 'oak';
import { postsRouter } from '@/routes/posts/mod.js';

const router = new Router();

router.use('/posts', postsRouter.routes());

export { router };

// export function register(app) {
//   app.use(posts);
//   return app;
// }
