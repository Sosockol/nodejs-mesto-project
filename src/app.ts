import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import logger from './utils/logger';
import { errorHandler, notFoundHandler, requestLogger } from './middleware';

const { PORT = 3000 } = process.env;
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования запросов
app.use(requestLogger);

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err: Error) => {
    logger.error('Error connecting to MongoDB:', err);
  });

// Базовый маршрут
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Mesto Backend API' });
});

// Middleware для обработки ошибок
app.use(errorHandler);

// Middleware для обработки 404
app.use(notFoundHandler);

// Запуск сервера
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});

export default app;
