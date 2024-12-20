import { getLogger } from '@logtape/logtape';

export async function requestLogger(ctx, next) {
  const logger = getLogger(['app']).with({ requestId: crypto.randomUUID() });
  const startTime = new Date();
  ctx.state.logger = logger;
  await next();
  const endTime = new Date();
  logger.info(
    `{requestId} ${ctx.request.method} ${ctx.request.url.pathname} - ${String(
      (endTime - startTime) / 1000
    )}`
  );
}
