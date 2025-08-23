# 🌟 Mesto Backend API

> Современный RESTful API для социальной сети Mesto, созданный с использованием Node.js, TypeScript и MongoDB

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

## 📖 Описание

Mesto Backend - это серверная часть социальной сети для обмена фотографиями. API предоставляет функциональность для регистрации пользователей, управления профилями, публикации карточек с изображениями и взаимодействия с контентом (лайки).

## ✨ Основные возможности

- 👤 **Управление пользователями**: регистрация, авторизация, обновление профиля
- 🖼️ **Управление карточками**: создание, удаление, просмотр карточек с изображениями
- ❤️ **Система лайков**: возможность ставить и убирать лайки
- 🔐 **Безопасность**: валидация данных, rate limiting, CORS
- 📝 **Логирование**: комплексная система логирования запросов и ошибок
- 🛡️ **Middleware**: защита от основных веб-уязвимостей
- 📚 **API документация**: интерактивная документация с помощью Swagger UI

## 🚀 Технический стек

### Основные технологии

- **Runtime**: Node.js
- **Язык**: TypeScript
- **Framework**: Express.js
- **База данных**: MongoDB с Mongoose ODM
- **Валидация**: Celebrate (Joi)

### Безопасность и производительность

- **Helmet**: Защита HTTP заголовков
- **CORS**: Настройка кросс-доменных запросов
- **Rate Limiting**: Ограничение количества запросов
- **Winston**: Система логирования

### Документация

- **Swagger UI**: Интерактивная документация API
- **OpenAPI 3.0**: Стандарт описания API

### Инструменты разработки

- **ESLint**: Статический анализ кода с Airbnb конфигурацией
- **ts-node-dev**: Hot reload для разработки
- **TypeScript Paths**: Алиасы для импортов

## 📁 Структура проекта

```
src/
├── 📁 config/          # Конфигурация приложения
├── 📁 controllers/     # Контроллеры бизнес-логики
│   ├── 📁 cards/       # Контроллеры для карточек
│   └── 📁 users/       # Контроллеры для пользователей
├── 📁 errors/          # Пользовательские классы ошибок
├── 📁 middleware/      # Промежуточное ПО
├── 📁 models/          # Mongoose модели
├── 📁 routes/          # Маршруты API
├── 📁 validation/      # Схемы валидации
└── 📄 app.ts           # Точка входа в приложение
```

## 🛠️ Установка и запуск

### Предварительные требования

- Node.js (версия 16+)
- MongoDB
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/mesto
NODE_ENV=development
```

### Запуск приложения

#### Режим разработки

```bash
npm run dev
```

#### Продакшн сборка

```bash
npm run build
npm start
```

#### Запуск с ts-node

```bash
npm run start:dev
```

## 📋 Доступные скрипты

| Команда             | Описание                                |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Запуск в режиме разработки с hot reload |
| `npm run build`     | Компиляция TypeScript в JavaScript      |
| `npm start`         | Запуск продакшн версии                  |
| `npm run start:dev` | Запуск с ts-node                        |
| `npm run lint`      | Проверка кода линтером                  |

## 🌐 API Endpoints

### Пользователи

- `GET /users` - Получить всех пользователей
- `GET /users/:id` - Получить пользователя по ID
- `PATCH /users/me` - Обновить профиль текущего пользователя
- `PATCH /users/me/avatar` - Обновить аватар

### Карточки

- `GET /cards` - Получить все карточки
- `POST /cards` - Создать новую карточку
- `DELETE /cards/:id` - Удалить карточку
- `PUT /cards/:id/likes` - Поставить лайк
- `DELETE /cards/:id/likes` - Убрать лайк

## 🔧 Конфигурация

Проект использует TypeScript Path Mapping для удобных импортов:

```typescript
import { User } from "@models/user";
import { authMiddleware } from "@middleware/auth";
import { userController } from "@controllers/users";
```

### API Документация

API документация доступна через Swagger UI после запуска сервера:

- **URL**: `http://localhost:3000/api-docs`
- **Формат**: OpenAPI 3.0
- **Возможности**:
  - Интерактивное тестирование API
  - Подробное описание всех endpoint'ов
  - Схемы запросов и ответов
  - Примеры использования

## 🧪 Разработка

### Линтинг

Проект использует ESLint с конфигурацией Airbnb:

```bash
npm run lint
```

### TypeScript

Строгая типизация включена для максимальной безопасности типов.

## 👨‍💻 Автор

**Dmitrii Bolokhontsev**

## 📄 Лицензия

ISC License
