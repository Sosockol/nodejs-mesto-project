import AppError from './AppError';

// 400 Bad Request
class BadRequestError extends AppError {
  constructor(message: string = 'Переданы некорректные данные') {
    super(message, 400);
  }
}

export default BadRequestError;
