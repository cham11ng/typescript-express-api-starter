import knex from '../config/db';

import User from '../models/User';

import RegisterBody from '../domain/RegisterBody';

/**
 * Register user
 *
 * @param  {} body
 */
export function create(body: RegisterBody): Promise<{}> {
  return knex('users')
    .insert({ name: body.name, email: body.email })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}

/**
 * Fetch all user
 */
export function fetchAll(): Promise<{}> {
  return knex
    .select()
    .from('users')
    .then((data: {}) => {
      return { data };
    });
}
