import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as pgp from '../utils/pgp';
import { createFile } from '../../src/utils/file';
import * as userService from '../services/userService';
import { PRIVATE_KEY_PASSPHRASE } from '../constants/constants';

/**
 * Register user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const keys = await pgp
      .generatePGPKeys({ name: req.body.name, email: req.body.email }, PRIVATE_KEY_PASSPHRASE)
      .then((data: { publicKey: string; privateKey: string }) => data)
      .catch((err: {}) => next(err));

    const privateKeyObj = pgp.decryptPrivateKey(keys.privateKey, PRIVATE_KEY_PASSPHRASE);

    createFile('./keys/' + req.body.username, keys.privateKey);

    const encryptedData = await pgp
      .encrypt(keys.publicKey, privateKeyObj, req.body.text)
      .then((data: { ciphertext: string }) => data.ciphertext)
      .catch((err: {}) => next(err));

    userService
      .create({ ...req.body, encryptedData, publicKey: keys.publicKey })
      .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
      .catch((error: {}) => next(error));
  } catch (err) {
    next(err);
  }
}
