import { Router } from 'express';
import { register, login } from '@controllers';
import { registerUserValidation, loginUserValidation } from '@validation';
import { authLimiter } from '@middleware';

const router = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя с email и паролем
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 30
 *                 description: Имя пользователя
 *               about:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 200
 *                 description: Описание пользователя
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 description: URL аватара пользователя
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Пароль пользователя
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// POST /signup — регистрация пользователя
router.post('/signup', authLimiter, registerUserValidation, register);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя и возвращает JWT токен
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен для доступа к API
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// POST /signin — авторизация пользователя
router.post('/signin', authLimiter, loginUserValidation, login);

export default router;
