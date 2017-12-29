require('babel-register');
require('dotenv').config();

const isTestEnvironment = process.env.NODE_ENV === 'test';
const APP_PORT = isTestEnvironment
  ? process.env.TEST_APP_PORT
  : process.env.APP_PORT;

module.exports = {
  development: {
    client: isTestEnvironment
      ? process.env.TEST_DB_CLIENT
      : process.env.DB_CLIENT || 'mssql',
    connection: {
      charset: 'utf8',
      user: isTestEnvironment ? process.env.TEST_DB_USER : process.env.DB_USER,
      port: isTestEnvironment ? process.env.TEST_DB_PORT : process.env.DB_PORT,
      database: isTestEnvironment
        ? process.env.TEST_DB_NAME
        : process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || '127.0.0.1'
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/migrations',
      stub: './src/stubs/migration.stub'
    },
    seeds: {
      directory: './src/seeds',
      stub: './src/stubs/seed.stub'
    }
  }
};
