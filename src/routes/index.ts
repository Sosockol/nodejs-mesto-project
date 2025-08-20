import { Router } from 'express';
import userRoutes from './users';
import cardRoutes from './cards';

const router = Router();

// Подключение роутов пользователей
router.use('/users', userRoutes);

// Подключение роутов карточек
router.use('/cards', cardRoutes);

export default router;