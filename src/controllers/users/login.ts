import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@models';
import { UnauthorizedError } from '@errors';

const { JWT_SECRET = 'dev-secret' } = process.env;

// POST /signin — авторизация пользователя
const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по email, включая поле password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    // Создаем JWT токен
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    // Возвращаем токен
    res.json({ token });
  } catch (error: any) {
    next(error);
  }
};

export default login;
