import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} from '@controllers';
import {
  createUserValidation,
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} from '@validation';
import { createLimiter } from '@middleware';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     description: Возвращает список всех пользователей в системе
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /users — возвращает всех пользователей
router.get('/', getUsers);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     description: Возвращает информацию о текущем авторизованном пользователе
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Информация о пользователе успешно получена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /users/me — возвращает информацию о текущем пользователе
router.get('/me', getCurrentUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Получить пользователя по ID
 *     description: Возвращает информацию о конкретном пользователе
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Уникальный идентификатор пользователя
 *         schema:
 *           type: string
 *           example: "64a1b2c3d4e5f67890123456"
 *     responses:
 *       200:
 *         description: Пользователь найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /users/:userId — возвращает пользователя по _id
router.get('/:userId', getUserByIdValidation, getUserById);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     summary: Обновить профиль текущего пользователя
 *     description: Обновляет информацию профиля текущего пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Профиль успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// PATCH /users/me — обновляет профиль
router.patch('/me', updateUserValidation, updateUser);

/**
 * @swagger
 * /users/me/avatar:
 *   patch:
 *     summary: Обновить аватар пользователя
 *     description: Обновляет аватар текущего пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAvatarRequest'
 *     responses:
 *       200:
 *         description: Аватар успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

export default router;
