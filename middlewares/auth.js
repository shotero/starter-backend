export async function authenticate(ctx, next) {
  try {
    const passport = ctx.cookies.get('passport');
    if (!passport) {
      console.log('AUTH: no passport found');
      ctx.response.redirect('/');
    }
    await next();
  } catch (e) {
    console.log(`AUTH: ${e.message}`);
    ctx.response.status = 400;
    ctx.response.redirect('/');
  }
}
