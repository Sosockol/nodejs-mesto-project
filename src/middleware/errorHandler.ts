import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { logger } from '@config';
import { AppError } from '@errors';

// Middleware для обработки ошибок
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Обработка ошибок валидации celebrate
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const errorParams = err.details.get('params');
    const errorQuery = err.details.get('query');

    let validationMessage = 'Переданы некорректные данные';

    if (errorBody) {
      validationMessage = errorBody.details[0].message;
    } else if (errorParams) {
      validationMessage = errorParams.details[0].message;
    } else if (errorQuery) {
      validationMessage = errorQuery.details[0].message;
    }

    logger.warn('Validation error:', {
      error: validationMessage,
      url: req.url,
      method: req.method,
      body: req.body,
    });

    res.status(400).json({ message: validationMessage });
    return;
  }

  // Логируем ошибку
  if (err instanceof AppError) {
    // Операционные ошибки - логируем как warning или info
    if (err.statusCode >= 500) {
      logger.error('Application error:', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        statusCode: err.statusCode,
      });
    } else {
      logger.warn('Client error:', {
        error: err.message,
        url: req.url,
        method: req.method,
        statusCode: err.statusCode,
      });
    }
  } else {
    // Неожиданные ошибки - логируем как error
    logger.error('Unexpected error:', {
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
    });
  }

  // Отправляем ответ клиенту
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'На сервере произошла ошибка';

  res.status(statusCode).json({ message });
};

// Middleware для обработки 404
export const notFoundHandler = (req: Request, res: Response): void => {
  logger.warn(`404 - Resource not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Requested resource not found' });
};
