import { Post } from '@/routes/forum/posts/model.js';
import { BaseController } from '@/routes/base/controller.js';

export class PostController extends BaseController {
  constructor() {
    const model = new Post();
    super(model);
  }
}
