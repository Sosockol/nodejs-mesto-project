import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, updateAvatar } from '@controllers';
import { createUserValidation, getUserByIdValidation, updateUserValidation, updateAvatarValidation } from '@validation';
import { createLimiter } from '@middleware';

const router = Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsers);

// GET /users/:userId — возвращает пользователя по _id
router.get('/:userId', getUserByIdValidation, getUserById);

// POST /users — создаёт пользователя (с дополнительным ограничением скорости)
router.post('/', createLimiter, createUserValidation, createUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', updateUserValidation, updateUser);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;