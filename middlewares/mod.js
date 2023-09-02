import { loggingMiddleware } from '@/middlewares/logger.js';
import { errorHandler } from '@/middlewares/errorHandler.js';

export function registerMiddlewares(app) {
  app.use(loggingMiddleware);
  app.use(errorHandler);
}
