import { HelmetOptions } from 'helmet';

// Конфигурация helmet для безопасности
export const helmetConfig: HelmetOptions = {
  // Настройка Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // Защита от clickjacking
  frameguard: { action: 'deny' },
  // Скрытие заголовка X-Powered-By
  hidePoweredBy: true,
  // Принуждение к HTTPS (отключено для разработки)
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000, // 1 год
    includeSubDomains: true,
    preload: true
  } : false,
  // Защита от MIME type sniffing
  noSniff: true,
  // Защита от XSS
  xssFilter: true,
  // Referrer Policy
  referrerPolicy: { policy: 'same-origin' }
};

// CORS конфигурация
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production'
    ? [
        'https://your-domain.com',
        'https://www.your-domain.com'
      ]
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001'
      ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // для поддержки legacy браузеров
};