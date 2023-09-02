const process = require('process');

const config = {
  creator: 'demouser',
  db: process.env.DATABASE_URL,
  paths: {
    up: './migrations/up',
    down: './migrations/down',
  },
  migration: {
    schema: 'migration',
    table: 'migrations',
  },
};

module.exports = config;
