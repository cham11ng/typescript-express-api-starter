import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as pgp from '../utils/pgp';
import * as userService from '../services/userService';
import * as fileService from '../../src/services/fileService';

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
      .generatePGPKeys({ name: req.body.name, email: req.body.email })
      .then((data: { publicKey: string; privateKey: string }) => data)
      .catch((err: {}) => next(err));

    fileService.createFile('./keys/' + req.body.username, keys.privateKey);

    const cipherText = await pgp
      .encrypt(req.body.text)
      .then((data: { ciphertext: string }) => data.ciphertext)
      .catch((err: {}) => next(err));

    userService
      .create({ ...req.body, cipherText, publicKey: keys.publicKey })
      .then((result: {}) => res.status(HTTPStatus.CREATED).json(result))
      .catch((error: {}) => next(error));
  } catch (err) {
    next(err);
  }
}
