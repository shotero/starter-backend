import { Application, Router } from '@oak/oak';
import { Eta } from '@eta-dev/eta';
import { authenticate } from '@/middlewares/auth.js';
import { errorHandler } from '@/middlewares/errorHandler.js';
import { requestLogger } from '@/middlewares/logger.js';
import { configure, getConsoleSink, getLogger } from '@logtape/logtape';
import { parse } from '@std/csv/parse';

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: ['logtape', 'meta'], sinks: ['console'], lowestLevel: 'error' },
    { category: 'app', lowestLevel: 'debug', sinks: ['console'] }
  ]
});
const logger = getLogger(['app']);

const d = await fetch(Deno.env.get('DATA_FILE'));
const text = await d.text();

const data = parse(text, { skipFirstRow: false }).filter(
  (i) => i[0] != '' && i[1] != ''
);

logger.info(`LOADED DATA: ${data.length} entries`);

function getByPassport(passportId) {
  return data.find((i) => i[4] == passportId);
}

function composePassword(dob) {
  return dob.trim().replaceAll('/', '');
}

function login(passportId, password) {
  logger.info(`passportid: ${passportId}, password: ${password}`);
  logger.debug(data.slice(0, 3));
  const user = data.find((i) => i[4] === passportId);
  if (user) {
    if (password === composePassword(user[5])) {
      return user[4].trim();
    } else {
      throw new Error('LOGIN: password mismatch');
    }
  } else {
    throw new Error('LOGIN: no user specified');
  }
}

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
    render: eta.render,
    logger: logger
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
      // secure: true, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // Convert to milliseconds
      signed: true
    });
    return ctx.response.redirect('/status');
  } catch (e) {
    logger.error(e.message);
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

app.use(requestLogger);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(errorHandler);

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
