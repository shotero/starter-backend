import { logger } from '@/middlewares/logger.js';
import { Posts } from '@/routes/posts/model.js';

const model = new Posts();

export function show(context) {
  try {
    console.log(context.params.id);
    return (context.response.body = model.show(context.params.id));
  } catch (err) {
    logger.error(err);
  }
}

// export function index(ctx: Context) {
//   try {
//     return (ctx.response.body = 'test');
//   } catch (err) {
//     logger.error(err);
//   }
// }

// export function show(context: Context) {
//   try {
//     return (context.response.body = 'hello');
//   } catch (err) {
//     logger.error(err);
//   }
// }

// export function create(context: Context) {
//   try {
//     return (context.response.body = 'hello');
//   } catch (err) {
//     logger.error(err);
//   }
// }
//
// export function post(context: Context) {
//   // throw new Error('test');
//   try {
//     context.response.body = 'hello';
//   } catch (err) {
//     logger.error(err);
//   }
// }
