import AppError from './AppError';

// 403 Forbidden
class ForbiddenError extends AppError {
  constructor(message: string = 'Недостаточно прав для выполнения операции') {
    super(message, 403);
  }
}

export default ForbiddenError;
