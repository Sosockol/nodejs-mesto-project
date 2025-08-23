import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { BadRequestError, NotFoundError } from '@errors';
import { Types } from 'mongoose';

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const userId = res.locals.user?._id;

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
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
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

export default likeCard;
