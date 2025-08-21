import AppError from './AppError';

// 404 Not Found
class NotFoundError extends AppError {
  constructor(message: string = 'Запрашиваемый ресурс не найден') {
    super(message, 404);
  }
}

export default NotFoundError;
