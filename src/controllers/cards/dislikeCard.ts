import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { BadRequestError, NotFoundError } from '@errors';
import { Types } from 'mongoose';

// DELETE /cards/:cardId/likes — убрать лайк с карточки
export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
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

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true }
    ).populate('owner', 'name about avatar')
     .populate('likes', 'name');

    if (!card) {
      return next(new NotFoundError('Карточка не найдена'));
    }

    res.json(card);
  } catch (error) {
    next(error);
  }
};