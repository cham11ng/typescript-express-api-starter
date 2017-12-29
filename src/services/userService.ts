import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import RegisterBody from '../domain/RegisterBody';

/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function create(body: RegisterBody): Promise<{}> {
  return knex('users')
    .insert({ name: body.name, email: body.email })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}

/**
 * Fetch user by id
 *
 * @param  {number} id
 */
export function findById(id: number) {
  return knex('users')
    .where('id', '=', id)
    .first()
    .then((user: {}) => {
      if (!user) {
        throw Boom.notFound(lang.userNotFound);
      }

      return { data: user };
    });
}

/**
 * Fetch user by email
 *
 * @param  {string} email
 */
export function findByEmail(email: string) {
  return knex('users')
    .where('email', '=', email)
    .first()
    .then((user: {}) => {
      if (!user) {
        throw Boom.notFound(lang.userNotFound);
      }

      return { data: user };
    });
}

/**
 * Fetch all user
 *
 * @returns Promise
 */
export function fetchAll(): Promise<{}> {
  return knex('users')
    .select()
    .then((data: {}) => ({ data }));
}
