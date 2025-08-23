import { Router } from 'express';
import { auth } from '@middleware';
import userRoutes from './users';
import cardRoutes from './cards';
import authRoutes from './auth';

const router = Router();

// Подключение маршрутов аутентификации (не требуют авторизации)
router.use('/', authRoutes);

// Middleware для проверки авторизации для всех последующих маршрутов
router.use(auth);

// Подключение роутов пользователей (требуют авторизации)
router.use('/users', userRoutes);

// Подключение роутов карточек (требуют авторизации)
router.use('/cards', cardRoutes);

export default router;
