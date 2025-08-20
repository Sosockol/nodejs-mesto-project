import rateLimit from 'express-rate-limit';
import { generalLimiterConfig, createLimiterConfig, authLimiterConfig } from '@config';

// Общий лимитер для всех запросов
export const generalLimiter = rateLimit(generalLimiterConfig);

// Строгий лимитер для создания ресурсов
export const createLimiter = rateLimit(createLimiterConfig);

// Очень строгий лимитер для аутентификации
export const authLimiter = rateLimit(authLimiterConfig);