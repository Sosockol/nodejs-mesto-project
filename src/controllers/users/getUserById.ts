import { Request, Response, NextFunction } from 'express';
import { User } from '@models';
import { NotFoundError, BadRequestError } from '@errors';

// GET /users/:userId — возвращает пользователя по _id
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    res.json(user);
  } catch (error: any) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};