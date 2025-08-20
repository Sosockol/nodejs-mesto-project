import { Request, Response, NextFunction } from 'express';
import { User } from '@models';
import { BadRequestError, NotFoundError } from '@errors';

// PATCH /users/me — обновляет профиль
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return next(new BadRequestError('Пользователь не авторизован'));
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true, // возвращать обновленную запись
        runValidators: true // запускать валидаторы схемы
      }
    );

    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }

    res.json(user);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};