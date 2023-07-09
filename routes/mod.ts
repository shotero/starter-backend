import { Router } from "oak";
import { postsRouter } from "@/routes/posts/mod.ts";

const router = new Router();

router.use("/posts", postsRouter.routes());

export { router };

// export function register(app) {
//   app.use(posts);
//   return app;
// }
