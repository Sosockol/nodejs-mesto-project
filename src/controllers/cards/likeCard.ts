import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { BadRequestError, NotFoundError } from '@errors';
import { Types } from 'mongoose';

// PUT /cards/:cardId/likes — поставить лайк карточке
export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
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
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true },
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
