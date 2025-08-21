import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import {
  logger,
  helmetConfig,
  corsConfig,
} from '@config';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  generalLimiter,
  securityLogger,
  browserCheck,
} from '@middleware';
import routes from '@routes';

const { PORT = 3000 } = process.env;
const app = express();

// Middleware для безопасности (helmet)
app.use(helmet(helmetConfig));

// Настройка CORS
app.use(cors(corsConfig));

// Проверка браузера
app.use(browserCheck);

// Middleware для ограничения скорости запросов
app.use(generalLimiter);

// Middleware для парсинга JSON с ограничением размера
app.use(express.json({ limit: '10mb' }));

// Middleware для логирования запросов
app.use(requestLogger);

// Middleware для логирования событий безопасности
app.use(securityLogger);

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err: Error) => {
    logger.error('Error connecting to MongoDB:', err);
  });

// Middleware для проверки авторизации
app.use((req: Request, _: Response, next: NextFunction) => {
  req.user = {
    _id: '68a61a36f52078d0045acf03',
  };

  next();
});

// Подключение роутов
app.use(routes);

// Базовый маршрут
app.get('/', (_: Request, res: Response) => {
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
