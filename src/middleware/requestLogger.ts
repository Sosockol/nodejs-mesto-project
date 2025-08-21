import { Request, Response, NextFunction } from 'express';
import { logger } from '@config';

// Middleware для логирования запросов
const requestLogger = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
};

export default requestLogger;
