import type * as _ from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}
