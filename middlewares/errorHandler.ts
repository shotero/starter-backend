import { type Context, type Next } from 'oak';

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = `Error: ${e.message}`;
  }
}
