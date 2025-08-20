import { Request, Response, NextFunction } from 'express';
import { User } from '@models';
import { NotFoundError, BadRequestError } from '@errors';
import { Types } from 'mongoose';

// GET /users/:userId — возвращает пользователя по _id
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    // Проверяем, что userId является валидным ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      next(new BadRequestError('Некорректный идентификатор пользователя'));
      return;
    }

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
