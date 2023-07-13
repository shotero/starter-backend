import { logger } from '@/logger.ts';
import { type Application, type Context, type Next } from 'oak';

async function loggingMiddleware(ctx: Context, next: Next) {
  try {
    await next();
    logger.info(
      `${ctx.request.method} - ${ctx.request.url}: ${ctx.response.status} - ${
        String(ctx.response.body)
      }`,
    );
  } catch (error) {
    throw error;
  }
}

async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = `Error: ${e.message}`;
  }
}

export function registerMiddlewares(app: Application) {
  app.use(loggingMiddleware);
  app.use(errorHandler);
}
