import { Router } from 'express';
import { getUsers, getUserById, createUser } from '@controllers';
import { createUserValidation, getUserByIdValidation } from '@validation';

const router = Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsers);

// GET /users/:userId — возвращает пользователя по _id
router.get('/:userId', getUserByIdValidation, getUserById);

// POST /users — создаёт пользователя
router.post('/', createUserValidation, createUser);

export default router;