// Конфигурация поддерживаемых браузеров
export const browserConfig = {
  // Включить/выключить проверку браузеров
  enabled: process.env.NODE_ENV === 'production',

  // Минимальные поддерживаемые версии браузеров
  supportedBrowsers: {
    chrome: 90,
    firefox: 88,
    safari: 14,
    edge: 90,
    opera: 76,
  },

  // Маршруты, которые не проверяются (API endpoints)
  skipRoutes: [
    '/api/',
    '/health',
    '/metrics',
  ],

  // User-Agent паттерны для API клиентов (пропускаются)
  apiClientPatterns: [
    /postman/i,
    /insomnia/i,
    /curl/i,
    /wget/i,
    /httpie/i,
    /python-requests/i,
    /node-fetch/i,
    /axios/i,
    /bot/i,
    /crawler/i,
    /spider/i,
    /googlebot/i,
    /bingbot/i,
  ],

  // Сообщения об ошибках
  messages: {
    unsupported: 'Неподдерживаемый браузер',
    outdated: 'Ваш браузер устарел и может работать некорректно',
  },

  // Ссылки для скачивания браузеров
  downloadLinks: {
    chrome: 'https://www.google.com/chrome/',
    firefox: 'https://www.mozilla.org/firefox/',
    safari: 'https://www.apple.com/safari/',
    edge: 'https://www.microsoft.com/edge',
    opera: 'https://www.opera.com/',
  },
};
