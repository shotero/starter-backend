export async function authenticate(ctx, next) {
  try {
    const passport = await ctx.cookies.get('passport');
    ctx.state.logger.info(`{requestId} - ${passport} LOGGED IN`);
    if (!passport) {
      ctx.response.redirect('/');
    }
    await next();
  } catch (e) {
    ctx.state.logger.info(`AUTH: ${e.message}`);
    ctx.response.status = 400;
    ctx.response.redirect('/');
  }
}
