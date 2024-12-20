export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.response.status = e.status || 500;
    ctx.response.body = ctx.app.state.render('./error', { e });
    ctx.state.logger.log(e.stack);
  }
}
