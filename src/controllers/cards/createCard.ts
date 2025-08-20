import { Request, Response, NextFunction } from 'express';
import { Card } from '@models';
import { BadRequestError } from '@errors';

// POST /cards — создаёт карточку
export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user?._id;

    if (!ownerId) {
      return next(new BadRequestError('Пользователь не авторизован'));
    }

    const card = await Card.create({
      name,
      link,
      owner: ownerId
    });

    // Возвращаем карточку с заполненными данными владельца
    const populatedCard = await Card.findById(card._id)
      .populate('owner', 'name about avatar');

    res.status(201).json(populatedCard);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};