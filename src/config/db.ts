import config from './config';
import * as client from 'knex';

/**
 * Database connection.
 */
const knex = client(config.database);

export default knex;
