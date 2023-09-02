import * as log from 'std/log/mod.ts';

log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG'),
  },
  loggers: {
    api: {
      level: 'DEBUG',
      handlers: ['console'],
    },
  },
});

export const logger = log.getLogger('api');

export async function loggingMiddleware(ctx, next) {
  try {
    await next();
    logger.info(
      `${ctx.request.method} - ${ctx.request.url}: ${
        ctx.response.status
      } - ${String(ctx.response.body)}`,
    );
  } catch (error) {
    throw error;
  }
}
