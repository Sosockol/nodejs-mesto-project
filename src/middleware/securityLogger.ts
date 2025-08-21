import { Request, Response, NextFunction } from 'express';
import { logger } from '@config';

// Middleware для логирования событий безопасности
const securityLogger = (req: Request, _: Response, next: NextFunction): void => {
  const clientIP = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.get('User-Agent') || 'unknown';

  /* eslint-disable no-multi-spaces */
  // Логируем подозрительные запросы
  const suspiciousPatterns = [
    /\.\.\//,           // Path traversal attempts
    /<script/i,         // XSS attempts
    /union.*select/i,   // SQL injection attempts
    /javascript:/i,     // JavaScript injection
    /eval\(/i,          // Code execution attempts
    /exec\(/i,          // Command execution attempts
  ];
  /* eslint-enable no-multi-spaces */

  const requestData = JSON.stringify({
    url: req.url,
    body: req.body,
    query: req.query,
    headers: req.headers,
  });

  const isSuspicious = suspiciousPatterns.some(
    (pattern) => pattern.test(requestData),
  );

  if (isSuspicious) {
    logger.warn('Suspicious request detected:', {
      ip: clientIP,
      userAgent,
      method: req.method,
      url: req.url,
      body: req.body,
      query: req.query,
      timestamp: new Date().toISOString(),
    });
  }

  // Логируем большие запросы (возможный DoS)
  if (req.get('content-length')) {
    const contentLength = parseInt(req.get('content-length') || '0', 10);
    if (contentLength > 1024 * 1024) { // > 1MB
      logger.warn('Large request detected:', {
        ip: clientIP,
        userAgent,
        method: req.method,
        url: req.url,
        contentLength,
        timestamp: new Date().toISOString(),
      });
    }
  }

  next();
};

export default securityLogger;
