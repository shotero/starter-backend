const process = require('process');

const config = {
  creator: 'demouser',
  db: process.env.DATABASE_URL,
  paths: {
    up: './db/migrations/up',
    down: './db/migrations/down',
  },
  migration: {
    schema: 'migration',
    table: 'migrations',
  },
};

module.exports = config;
