import { logger } from "@/logger.ts";

export function get(context) {
  try {
    return context.response.body = "hello";
  } catch (err) {
    logger.error(err);
  }
}

export function post(context) {
  throw new Error("test");
  try {
    return context.response.body = "hello";
  } catch (err) {
    logger.error(err);
  }
}
