import * as Boom from 'boom';

import knex from '../config/db';
import lang from '../utils/lang';
import UpdateBody from '../domain/UpdateBody';
import RegisterBody from '../domain/RegisterBody';

/**
 * Create user
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function create(body: RegisterBody): Promise<{}> {
  return knex('users')
    .insert({
      name: body.name,
      email: body.email,
      username: body.username,
      public_key: body.publicKey,
      encrypted_data: body.encryptedData
    })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }))
    .catch((err: {}) => err);
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

/**
 * Update specific user
 *
 * @param  {UpdateBody} body
 * @returns Promise
 */
export function update(body: UpdateBody): Promise<{}> {
  return knex('users')
    .where('id', body.id)
    .update({ name: body.name })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}

/**
 * Remove specific user
 *
 * @param  {number} id
 * @returns Promise
 */
export function removeUserById(id: number): Promise<{}> {
  return knex('users')
    .where('id', id)
    .delete()
    .then((user: {}) => ({
      message: 'User deleted successfully',
      data: {
        id: user
      }
    }));
}
