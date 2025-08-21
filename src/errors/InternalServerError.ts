import AppError from './AppError';

// 500 Internal Server Error
class InternalServerError extends AppError {
  constructor(message: string = 'На сервере произошла ошибка') {
    super(message, 500);
  }
}

export default InternalServerError;
