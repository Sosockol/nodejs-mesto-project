import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mesto Backend API',
      version: '1.0.0',
      description: 'RESTful API для социальной сети Mesto - обмен фотографиями',
      contact: {
        name: 'Dmitrii Bolokhontsev',
        email: 'your-email@example.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'about', 'avatar'],
          properties: {
            _id: {
              type: 'string',
              description: 'Уникальный идентификатор пользователя',
              example: '64a1b2c3d4e5f67890123456',
            },
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 30,
              description: 'Имя пользователя',
              example: 'Иван Петров',
            },
            about: {
              type: 'string',
              minLength: 2,
              maxLength: 200,
              description: 'Информация о пользователе',
              example: 'Фотограф и путешественник',
            },
            avatar: {
              type: 'string',
              format: 'uri',
              description: 'URL аватара пользователя',
              example: 'https://example.com/avatar.jpg',
            },
          },
        },
        Card: {
          type: 'object',
          required: ['name', 'link', 'owner'],
          properties: {
            _id: {
              type: 'string',
              description: 'Уникальный идентификатор карточки',
              example: '64a1b2c3d4e5f67890123457',
            },
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 30,
              description: 'Название карточки',
              example: 'Красивый закат',
            },
            link: {
              type: 'string',
              format: 'uri',
              description: 'URL изображения',
              example: 'https://example.com/image.jpg',
            },
            owner: {
              type: 'string',
              description: 'ID владельца карточки',
              example: '64a1b2c3d4e5f67890123456',
            },
            likes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Массив ID пользователей, которые лайкнули карточку',
              example: ['64a1b2c3d4e5f67890123456', '64a1b2c3d4e5f67890123458'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания карточки',
              example: '2023-07-01T12:00:00.000Z',
            },
          },
        },
        CreateUserRequest: {
          type: 'object',
          required: ['name', 'about', 'avatar'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 30,
              description: 'Имя пользователя',
              example: 'Иван Петров',
            },
            about: {
              type: 'string',
              minLength: 2,
              maxLength: 200,
              description: 'Информация о пользователе',
              example: 'Фотограф и путешественник',
            },
            avatar: {
              type: 'string',
              format: 'uri',
              description: 'URL аватара пользователя',
              example: 'https://example.com/avatar.jpg',
            },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 30,
              description: 'Имя пользователя',
              example: 'Иван Петров',
            },
            about: {
              type: 'string',
              minLength: 2,
              maxLength: 200,
              description: 'Информация о пользователе',
              example: 'Фотограф и путешественник',
            },
          },
        },
        UpdateAvatarRequest: {
          type: 'object',
          required: ['avatar'],
          properties: {
            avatar: {
              type: 'string',
              format: 'uri',
              description: 'URL аватара пользователя',
              example: 'https://example.com/new-avatar.jpg',
            },
          },
        },
        CreateCardRequest: {
          type: 'object',
          required: ['name', 'link'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 30,
              description: 'Название карточки',
              example: 'Красивый закат',
            },
            link: {
              type: 'string',
              format: 'uri',
              description: 'URL изображения',
              example: 'https://example.com/image.jpg',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Сообщение об ошибке',
              example: 'Пользователь не найден',
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Сообщение об ошибке валидации',
              example: 'Validation failed',
            },
            validation: {
              type: 'object',
              description: 'Детали ошибки валидации',
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: 'Ресурс не найден',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        ValidationError: {
          description: 'Ошибка валидации данных',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Внутренняя ошибка сервера',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'API для работы с пользователями',
      },
      {
        name: 'Cards',
        description: 'API для работы с карточками',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Путь к файлам с аннотациями
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mesto API Documentation',
};

export { swaggerUi };
