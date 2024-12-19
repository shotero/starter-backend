import { Application, Router } from '@oak/oak';
import { Eta } from '@eta-dev/eta';
import { authenticate } from '@/middlewares/auth.js';
import { getByPassport, login } from '@/data/data.js';
import { errorHandler } from '@/middlewares/errorHandler.js';

const viewpath = Deno.cwd() + '/views/';
const eta = new Eta({
  views: viewpath,
  cache: true,
  varName: 'state',
  defaultExtension: '.ejs'
});

const app = new Application({
  keys: [crypto.randomUUID()],
  state: {
    render: eta.render
  }
});

const router = new Router();

router.post('/', async (ctx) => {
  const form = await ctx.request.body.form();
  const passport = form.get('passport');
  const password = form.get('password');

  try {
    const entry = login(passport, password);
    await ctx.cookies.set('passport', entry, {
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // Convert to milliseconds
      signed: true
    });

    return ctx.response.redirect('/status');
  } catch (e) {
    return ctx.response.redirect('/?error=WRONG_INFO');
  }
});

router.get('/logout', async (ctx) => {
  await ctx.cookies.delete('passport');
  ctx.response.redirect('/');
});

router.get('/status', authenticate, async (ctx) => {
  const passportId = await ctx.cookies.get('passport');
  ctx.response.body = eta.render('./status', {
    user: getByPassport(passportId)
  });
});

router.get('/', async (ctx) => {
  const passport = await ctx.cookies.get('passport');
  if (passport) {
    ctx.response.redirect('/status');
  }
  ctx.response.body = eta.render('./auth', {
    error: ctx.request.url.searchParams.get('error'),
    passport
  });
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(errorHandler);

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/static`,
      index: 'index.html'
    });
  } catch {
    await next();
  }
});

if (Deno.env.get('ENVIRONMENT') == 'development') {
  app.listen({
    port: 8000,
    secure: true,
    cert: Deno.readTextFileSync('./certs/localhost+1.pem'),
    key: Deno.readTextFileSync('./certs/localhost+1-key.pem')
  });
} else {
  app.listen({
    port: 8000
  });
}
