import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as pgp from '../utils/pgp';

/**
 * Controller for handeling pgp keys generate request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function generate(req: Request, res: Response, next: NextFunction): void {
  const { email, name } = req.body;
  pgp
    .generatePGPKeys({ email, name })
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}

/**
 * Controller for handeling encrypt request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function encrypt(req: Request, res: Response, next: NextFunction): void {
  pgp
    .encrypt(req.body.plainText)
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}

/**
 * Controller for handeling decrypt request
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function decrypt(req: Request, res: Response, next: NextFunction): void {
  pgp
    .decrypt(req.body.cipherText)
    .then((data: {}) => res.status(HTTPStatus.OK).send({ data }))
    .catch((err: {}) => next(err));
}
