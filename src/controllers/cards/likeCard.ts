import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { NotFoundError } from '@errors';

// PUT /cards/:cardId/likes — поставить лайк карточке
const likeCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { cardId } = req.params;
    const userId = res.locals.user?._id;

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
