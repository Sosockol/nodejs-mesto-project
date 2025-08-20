import { Request, Response, NextFunction } from 'express';
import { logger } from '@config';
import { browserConfig } from '@config/browser';

// Middleware для проверки браузера
export const browserCheck = (req: Request, res: Response, next: NextFunction) => {
  // Пропускаем, если проверка отключена
  if (!browserConfig.enabled) {
    return next();
  }

  // Пропускаем определенные маршруты
  if (browserConfig.skipRoutes.some((route) => req.url.startsWith(route))) {
    return next();
  }

  const userAgent = req.get('User-Agent') || '';
  const clientIP = req.ip || req.socket.remoteAddress || 'unknown';

  // Пропускаем API клиенты и боты
  if (isApiClient(userAgent)) {
    return next();
  }

  const browserInfo = parseBrowser(userAgent);

  if (!browserInfo) {
    logger.warn('Unknown browser detected:', {
      ip: clientIP,
      userAgent,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    return res.status(426).json({
      message: browserConfig.messages.unsupported,
      error: 'UNSUPPORTED_BROWSER',
      supportedBrowsers: {
        'Google Chrome': `${browserConfig.supportedBrowsers.chrome}+`,
        'Mozilla Firefox': `${browserConfig.supportedBrowsers.firefox}+`,
        Safari: `${browserConfig.supportedBrowsers.safari}+`,
        'Microsoft Edge': `${browserConfig.supportedBrowsers.edge}+`,
        Opera: `${browserConfig.supportedBrowsers.opera}+`,
      },
      downloadLinks: browserConfig.downloadLinks,
    });
  }

  const { name, version } = browserInfo;
  const minVersion = browserConfig.supportedBrowsers[name as keyof typeof browserConfig.supportedBrowsers];

  if (minVersion && version < minVersion) {
    logger.warn('Outdated browser detected:', {
      ip: clientIP,
      userAgent,
      browser: `${name} ${version}`,
      minRequired: minVersion,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    return res.status(426).json({
      message: `${browserConfig.messages.outdated}: ${name} ${version}`,
      error: 'BROWSER_OUTDATED',
      currentVersion: version,
      minimumVersion: minVersion,
      browserName: name,
      downloadLinks: browserConfig.downloadLinks,
    });
  }

  next();
};

// Проверка, является ли запрос от API клиента
function isApiClient(userAgent: string): boolean {
  return browserConfig.apiClientPatterns.some((pattern) => pattern.test(userAgent));
}

// Парсинг информации о браузере
function parseBrowser(userAgent: string): { name: string; version: number } | null {
  // Chrome (должен быть проверен перед Safari, так как Chrome содержит Safari в UA)
  let match = userAgent.match(/Chrome\/(\d+)/);
  if (match && !userAgent.includes('Edge') && !userAgent.includes('OPR')) {
    return { name: 'chrome', version: parseInt(match[1]) };
  }

  // Edge (новый Chromium Edge)
  match = userAgent.match(/Edg\/(\d+)/);
  if (match) {
    return { name: 'edge', version: parseInt(match[1]) };
  }

  // Firefox
  match = userAgent.match(/Firefox\/(\d+)/);
  if (match) {
    return { name: 'firefox', version: parseInt(match[1]) };
  }

  // Safari (должен быть проверен после Chrome)
  match = userAgent.match(/Version\/(\d+).*Safari/);
  if (match && userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return { name: 'safari', version: parseInt(match[1]) };
  }

  // Opera
  match = userAgent.match(/OPR\/(\d+)/);
  if (match) {
    return { name: 'opera', version: parseInt(match[1]) };
  }

  return null;
}
