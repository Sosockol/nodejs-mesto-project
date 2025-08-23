import { Request, Response, NextFunction } from 'express';
import { User } from '@models';
import { NotFoundError } from '@errors';

// GET /users/me — возвращает информацию о текущем пользователе
const getCurrentUser = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = res.locals.user?._id;

    if (!userId) {
      throw new NotFoundError('Пользователь не найден');
    }

    // Ищем пользователя по ID
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    // Возвращаем информацию о пользователе
    res.json(user);
  } catch (error: any) {
    next(error);
  }
};

export default getCurrentUser;
