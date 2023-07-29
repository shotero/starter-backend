import { logger } from '@/middlewares/logger.ts';
import { type Context } from 'oak';
import { get } from '@/routes/posts/repo.ts';

export function show(context) {
  try {
    return (context.response.body = get(context.params.id));
  } catch (err) {
    logger.error(err);
  }
}

export function index(ctx: Context) {
  try {
    return (ctx.response.body = 'test');
  } catch (err) {
    logger.error(err);
  }
}

// export function show(context: Context) {
//   try {
//     return (context.response.body = 'hello');
//   } catch (err) {
//     logger.error(err);
//   }
// }

export function create(context: Context) {
  try {
    return (context.response.body = 'hello');
  } catch (err) {
    logger.error(err);
  }
}

export function post(context: Context) {
  // throw new Error('test');
  try {
    context.response.body = 'hello';
  } catch (err) {
    logger.error(err);
  }
}
