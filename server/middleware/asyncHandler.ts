import { NextFunction, Request, Response } from 'express';

/* Higher order function wrapped around async calls to minimize try catch blocks
The code of a promise executor and promise handlers has an "invisible try..catch"
 around it. If an exception happens, it gets caught and treated as a rejection.
*/
export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next);

