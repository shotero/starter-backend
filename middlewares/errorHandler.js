export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      ctx.response.status = e.status;
      ctx.response.body = ctx.app.state.render('./error', { e });
    } else if (e instanceof Error) {
      ctx.response.status = 500;
      ctx.response.body = ctx.app.state.render('./error', { e });
      console.log(e.stack);
    }
  }
}
