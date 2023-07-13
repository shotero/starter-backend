import { logger } from '@/logger.ts';
import { type Context } from 'oak';

export function get(context: Context) {
  try {
    return context.response.body = 'hello';
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
