import * as HTTPStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';
import { request } from 'http';

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
    .then((result: {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
}

/**
 * Get specific user
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns void
 */
export function show(req: Request, res: Response, next: NextFunction): void {
  userService
    .findById(req.params.id)
    .then((result = {}) => res.status(HTTPStatus.OK).json(result))
    .catch((error: {}) => next(error));
}
