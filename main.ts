import { Application } from 'oak';
import { router } from '@/routes/mod.ts';
import { registerMiddlewares } from '@/middlewares.ts';

const app = new Application();

registerMiddlewares(app);
app.use(router.routes());

await app.listen({ port: 8000 });
