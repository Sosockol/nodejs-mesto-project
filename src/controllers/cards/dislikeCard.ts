import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { BadRequestError, NotFoundError } from '@errors';
import { Types } from 'mongoose';

// DELETE /cards/:cardId/likes — убрать лайк с карточки
const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cardId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      next(new BadRequestError('Пользователь не авторизован'));
      return;
    }

    // Проверяем, что cardId является валидным ObjectId
    if (!Types.ObjectId.isValid(cardId)) {
      next(new BadRequestError('Некорректный идентификатор карточки'));
      return;
    }

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // убрать _id из массива
      { new: true },
    ).populate('owner', 'name about avatar')
      .populate('likes', 'name');

    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    res.json(card);
  } catch (error) {
    next(error);
  }
};

export default dislikeCard;
