import AppError from './AppError';

// 409 Conflict
class ConflictError extends AppError {
  constructor(message: string = 'Пользователь с таким email уже существует') {
    super(message, 409);
  }
}

export default ConflictError;
