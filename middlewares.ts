import { logger } from "@/logger.ts";
import { Status } from "oak";

async function loggingMiddleware(ctx, next) {
  await next();
  logger.info(
    `${ctx.request.method} - ${ctx.request.url}: ${ctx.response.status} - ${ctx.response.body}`,
  );
}

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = `Error: ${e.message}`;
  }
}

export function registerMiddlewares(app) {
  app.use(loggingMiddleware);
  app.use(errorHandler);
}
