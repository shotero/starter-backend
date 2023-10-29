import { logger } from '@/middlewares/logger.js';

export class BaseController {
  constructor(model) {
    this.model = model;
  }

  async show(context) {
    try {
      const result = await this.model.show(context.params.id);
      context.response.body = result.shift();
    } catch (err) {
      logger.error(err);
    }
  }

  async list(context) {
    try {
      const list = await this.model.list();
      context.response.body = list;
    } catch (err) {
      logger.error(err);
    }
  }

  update(context) {
    try {
      const body = context.request.body;
      context.response.body = this.model.update(context.params.id, body);
    } catch (err) {
      logger.error(err);
    }
  }

  create(context) {
    try {
      const body = context.request.body;
      this.model.create(body);
    } catch (err) {
      logger.error(err);
    }
  }
}
