import knex from '../config/db';

import User from '../models/User';

import RegisterBody from '../domain/RegisterBody';

/**
 * Register user
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
 * @param  {number} id
 */
export function findById(id: number) {
  return knex('users')
    .where('id', '=', id)
    .first()
    .then((data: {}) => {
      return { data };
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
    .then((data: {}) => {
      return { data };
    });
}
