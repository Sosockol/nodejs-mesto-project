import AppError from './AppError';

// 401 Unauthorized
class UnauthorizedError extends AppError {
  constructor(message: string = 'Необходима авторизация') {
    super(message, 401);
  }
}

export default UnauthorizedError;
