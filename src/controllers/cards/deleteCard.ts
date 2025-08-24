import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { NotFoundError, ForbiddenError } from '@errors';

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cardId } = req.params;
    const userId = res.locals.user?._id;

    if (!userId) {
      next(new ForbiddenError('Пользователь не авторизован'));
      return;
    }

    // Находим карточку
    const card = await Card.findById(cardId);

    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    // Проверяем, что пользователь является владельцем карточки
    if (card.owner.toString() !== userId) {
      next(new ForbiddenError('Недостаточно прав для удаления карточки'));
      return;
    }

    // Удаляем карточку
    await Card.findByIdAndDelete(cardId);

    res.json({ message: 'Карточка удалена' });
  } catch (error) {
    next(error);
  }
};

export default deleteCard;
