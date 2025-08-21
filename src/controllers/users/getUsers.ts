import { Request, Response, NextFunction } from 'express';
import { User } from '@models';

// GET /users — возвращает всех пользователей
const getUsers = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export default getUsers;
