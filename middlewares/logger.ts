import { type Context, type Next } from 'oak';
import { pino } from 'pino';
// import pinoPretty from 'pino-pretty';

// const transport = pino.transport({
//   target: 'pino-pretty',
//   options: { destination: 1 } // use 2 for stderr
// })

const logger = pino();
export { logger };

export async function loggingMiddleware(ctx: Context, next: Next) {
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
