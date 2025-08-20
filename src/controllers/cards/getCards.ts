import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';

// GET /cards — возвращает все карточки
export const getCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cards = await Card.find({})
      .populate('owner', 'name about avatar')
      .populate('likes', 'name')
      .sort({ createdAt: -1 }); // сортировка по дате создания (новые сначала)

    res.json(cards);
  } catch (error) {
    next(error);
  }
};
