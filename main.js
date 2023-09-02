import { Application } from 'oak';
import { router } from '@/routes/mod.js';
import { registerMiddlewares } from '@/middlewares/mod.js';
import 'std/dotenv/load.ts';

// try to load plugins
// >> perform migrations
// >> validate
// >> mount
// await load();
const app = new Application();

app.use(router.routes());
registerMiddlewares(app);

await app.listen({ port: 8000 });
