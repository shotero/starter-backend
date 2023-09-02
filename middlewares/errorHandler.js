export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = `Error: ${e.message}`;
  }
}
