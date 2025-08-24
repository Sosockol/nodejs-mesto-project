import { Request, Response, NextFunction } from 'express';
import { User } from '@models';
import { NotFoundError } from '@errors';

// GET /users/:userId — возвращает пользователя по _id
const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default getUserById;
