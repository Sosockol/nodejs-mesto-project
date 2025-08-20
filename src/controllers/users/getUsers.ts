import { Request, Response, NextFunction } from 'express';
import { User } from '@models';

// GET /users — возвращает всех пользователей
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};
