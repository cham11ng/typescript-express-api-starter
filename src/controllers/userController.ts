import { request } from 'http';
import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as pgp from '../utils/pgp';
import { readFile } from '../utils/file';
import * as userService from '../services/userService';
import { PRIVATE_KEY_PASSPHRASE } from '../constants/constants';

/**
 * Get list of user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function index(req: Request, res: Response, next: NextFunction): void {
  userService
    .fetchAll()
    .then((data: {}) => res.status(HTTPStatus.OK).json({ data }))
    .catch((error: {}) => next(error));
}

/**
 * Get specific user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export async function show(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const user = await userService
      .findById(req.params.id)
      .then((data = {}) => data)
      .catch((error: {}) => next(error));

    const privateKey = readFile('./keys/' + user.username);
    const privateKeyObj = pgp.decryptPrivateKey(privateKey, PRIVATE_KEY_PASSPHRASE);

    pgp
      .decrypt(user.public_key, privateKeyObj, user.encrypted_data)
      .then((decryptedData: { plaintext: string }) => {
        res.status(HTTPStatus.OK).json({ data: { decryptedData: decryptedData.plaintext, ...user } });
      })
      .catch((err: {}) => next(err));
  } catch (err) {
    next(err);
  }
}

/**
 * Update specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function update(req: Request, res: Response, next: NextFunction): void {
  req.body.id = req.params.id;
  userService
    .update(req.body)
    .then((data: {}) => res.status(HTTPStatus.OK).json({ data }))
    .catch((error: {}) => next(error));
}

/**
 * Delete specific user information
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function remove(req: Request, res: Response, next: NextFunction): void {
  userService
    .removeUserById(req.params.id)
    .then((data: {}) => res.status(HTTPStatus.OK).json({ data }))
    .catch((error: {}) => next(error));
}
