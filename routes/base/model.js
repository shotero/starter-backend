import { builder, db } from '@/utils/db.ts';

export class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }

  list() {
    return builder.selectFrom(this.tablename).selectAll().compile();
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

  show(id) {
    const query = builder
      .selectFrom(this.tablename)
      .selectAll()
      .where('id', '=', id)
      .compile();

    console.log(query);
    return db.query(query.sql, query.parameters);
  }
}
