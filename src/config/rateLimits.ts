import { Request } from 'express';

// Базовая конфигурация для rate limiting
const baseRateLimitConfig = {
  standardHeaders: true, // Возвращает информацию о лимите в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключает заголовки `X-RateLimit-*`
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
} as const;

// Общий лимитер для всех запросов
export const generalLimiterConfig = {
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 минут
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // строже в продакшене
  message: {
    message: 'Слишком много запросов с вашего IP, попробуйте позже'
  },
} as const;

// Строгий лимитер для создания ресурсов
export const createLimiterConfig = {
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 минут
  max: process.env.NODE_ENV === 'production' ? 10 : 50, // строже в продакшене
  message: {
    message: 'Слишком много попыток создания, попробуйте позже'
  },
  // Применять лимит только для POST запросов
  skip: (req: Request) => req.method !== 'POST',
} as const;

// Очень строгий лимитер для аутентификации
export const authLimiterConfig = {
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 минут
  max: process.env.NODE_ENV === 'production' ? 5 : 20, // строже в продакшене
  message: {
    message: 'Слишком много попыток входа, попробуйте позже'
  },
  // Не учитываем успешные попытки
  skipSuccessfulRequests: true,
} as const;