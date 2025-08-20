import { Router } from 'express';
import userRoutes from './users';

const router = Router();

// Подключение роутов пользователей
router.use('/users', userRoutes);

export default router;