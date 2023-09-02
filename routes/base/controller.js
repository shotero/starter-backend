import { logger } from '@/middlewares/logger.js';
import { Model } from '@/routes/base/model.js';

export class BaseController {
  constructor(table) {
    this.table = table;
    this.model = new Model(table);
  }

  show(context) {
    try {
      context.response.body = this.model.show(context.params.id);
    } catch (err) {
      logger.error(err);
    }
  }

  list(context) {
    try {
      context.response.body = this.model.list();
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
