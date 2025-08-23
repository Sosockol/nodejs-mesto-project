import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '@models';
import { BadRequestError, ConflictError } from '@errors';

// POST /signup — регистрация пользователя
const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      name = 'Жак-Ив Кусто',
      about = 'Исследователь',
      avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      email,
      password,
    } = req.body;

    // Хешируем пароль
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создаем пользователя
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    // Возвращаем пользователя без пароля
    const userResponse = {
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    };

    res.status(201).json(userResponse);
  } catch (error: any) {
    if (error.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

export default register;
