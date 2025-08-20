import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { NotFoundError, ForbiddenError, BadRequestError } from '@errors';
import { Types } from 'mongoose';

// DELETE /cards/:cardId — удаляет карточку по идентификатору
export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return next(new BadRequestError('Пользователь не авторизован'));
    }

    // Проверяем, что cardId является валидным ObjectId
    if (!Types.ObjectId.isValid(cardId)) {
      return next(new BadRequestError('Некорректный идентификатор карточки'));
    }

    // Находим карточку
    const card = await Card.findById(cardId);

    if (!card) {
      return next(new NotFoundError('Карточка не найдена'));
    }

    // Проверяем, что пользователь является владельцем карточки
    if (card.owner.toString() !== userId) {
      return next(new ForbiddenError('Недостаточно прав для удаления карточки'));
    }

    // Удаляем карточку
    await Card.findByIdAndDelete(cardId);

    res.json({ message: 'Карточка удалена' });
  } catch (error) {
    next(error);
  }
};