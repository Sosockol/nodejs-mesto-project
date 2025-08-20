import { Router } from 'express';
import { getUsers, getUserById, createUser } from '@controllers';
import { createUserValidation, getUserByIdValidation } from '@validation';
import { createLimiter } from '@middleware';

const router = Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsers);

// GET /users/:userId — возвращает пользователя по _id
router.get('/:userId', getUserByIdValidation, getUserById);

// POST /users — создаёт пользователя (с дополнительным ограничением скорости)
router.post('/', createLimiter, createUserValidation, createUser);

export default router;