import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '@controllers';
import {
  createCardValidation,
  cardIdValidation,
} from '@validation';
import { createLimiter } from '@middleware';

const router = Router();

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Получить все карточки
 *     description: Возвращает список всех карточек в системе
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Список карточек успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /cards — возвращает все карточки
router.get('/', getCards);

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Создать новую карточку
 *     description: Создает новую карточку с изображением
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCardRequest'
 *     responses:
 *       201:
 *         description: Карточка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// POST /cards — создаёт карточку (с дополнительным ограничением скорости)
router.post('/', createLimiter, createCardValidation, createCard);

/**
 * @swagger
 * /cards/{cardId}:
 *   delete:
 *     summary: Удалить карточку
 *     description: Удаляет карточку по идентификатору (только владелец может удалить свою карточку)
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: Уникальный идентификатор карточки
 *         schema:
 *           type: string
 *           example: "64a1b2c3d4e5f67890123457"
 *     responses:
 *       200:
 *         description: Карточка успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       403:
 *         description: Нет прав для удаления карточки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', cardIdValidation, deleteCard);

/**
 * @swagger
 * /cards/{cardId}/likes:
 *   put:
 *     summary: Поставить лайк карточке
 *     description: Добавляет лайк карточке от текущего пользователя
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: Уникальный идентификатор карточки
 *         schema:
 *           type: string
 *           example: "64a1b2c3d4e5f67890123457"
 *     responses:
 *       200:
 *         description: Лайк успешно поставлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', cardIdValidation, likeCard);

/**
 * @swagger
 * /cards/{cardId}/likes:
 *   delete:
 *     summary: Убрать лайк с карточки
 *     description: Удаляет лайк карточки от текущего пользователя
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: Уникальный идентификатор карточки
 *         schema:
 *           type: string
 *           example: "64a1b2c3d4e5f67890123457"
 *     responses:
 *       200:
 *         description: Лайк успешно убран
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

export default router;
