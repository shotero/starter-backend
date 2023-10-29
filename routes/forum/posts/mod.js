import { PostController } from '@/routes/forum/posts/controller.js';
import { createRouter } from '@/routes/base/mod.js';

const controller = new PostController();
const router = createRouter(controller, 'posts');

export { router };
