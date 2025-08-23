import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@errors';

const { JWT_SECRET = 'dev-secret' } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new UnauthorizedError('Необходима авторизация');
  }

  // Сохраняем данные пользователя в res.locals
  res.locals.user = payload as { _id: string };
  next();
};

export default auth;
