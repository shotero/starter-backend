import { builder, query } from '@/db/db.ts';

export class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  async list() {
    const statement = builder.selectFrom(this.tablename).selectAll().compile();
    return await query(statement.sql, statement.parameters);
  }

  create(data) {
    return builder.insertInto(this.tablename).values(data).compile();
  }

  update(id, data) {
    return builder
      .updateTable(this.tablename)
      .set(data)
      .where('id', '=', id)
      .compile();
  }

  async show(id) {
    const statement = builder
      .selectFrom(this.tablename)
      .selectAll()
      .where('id', '=', id)
      .compile();
    return await query(statement.sql, statement.parameters);
  }
}
