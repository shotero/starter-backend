import { type Application } from 'oak';
import { loggingMiddleware } from '@/middlewares/logger.ts';
import { errorHandler } from '@/middlewares/errorHandler.ts';

export function registerMiddlewares(app: Application) {
  app.use(loggingMiddleware);
  app.use(errorHandler);
}
