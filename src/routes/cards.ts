import { Router } from 'express';
import { getCards, createCard, deleteCard } from '@controllers';
import { createCardValidation, deleteCardValidation } from '@validation';
import { createLimiter } from '@middleware';

const router = Router();

// GET /cards — возвращает все карточки
router.get('/', getCards);

// POST /cards — создаёт карточку (с дополнительным ограничением скорости)
router.post('/', createLimiter, createCardValidation, createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/:cardId', deleteCardValidation, deleteCard);

export default router;