import { Router } from "oak";
import { get, post } from "@/routes/posts/controller.ts";

const postsRouter = new Router();

postsRouter.get("/", get);
postsRouter.post("/", post);

export { postsRouter };
