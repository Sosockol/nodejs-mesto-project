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

// GET /cards — возвращает все карточки
router.get('/', getCards);

// POST /cards — создаёт карточку (с дополнительным ограничением скорости)
router.post('/', createLimiter, createCardValidation, createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', cardIdValidation, deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/:cardId/likes', cardIdValidation, likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

export default router;
