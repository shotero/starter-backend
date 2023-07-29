import { Application } from 'oak';
import { router } from '@/routes/mod.ts';
import { registerMiddlewares } from '@/middlewares/mod.ts';

const app = new Application();

app.use(router.routes());
registerMiddlewares(app);

await app.listen({ port: 8000 });
