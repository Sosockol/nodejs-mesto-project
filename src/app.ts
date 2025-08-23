import express, {
  NextFunction,
  Request as ExpressRequest,
  Response,
} from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import {
  logger,
  helmetConfig,
  corsConfig,
  swaggerSpec,
  swaggerUi,
  swaggerUiOptions,
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

// Расширение типа Request для добавления свойства user
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
      };
    }
  }
}

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

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err: Error) => {
    logger.error('Error connecting to MongoDB:', err);
  });

// Middleware для проверки авторизации
app.use((req: ExpressRequest, _: Response, next: NextFunction) => {
  req.user = {
    _id: '68a61a36f52078d0045acf03',
  };

  next();
});

// Подключение роутов
app.use(routes);

// Middleware для обработки ошибок
app.use(errorHandler);

// Middleware для обработки 404
app.use(notFoundHandler);

// Запуск сервера
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
