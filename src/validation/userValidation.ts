import { celebrate, Joi } from 'celebrate';

// Схема валидации для регистрации пользователя
export const registerUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional()
      .messages({
        'string.min': 'Имя должно содержать минимум 2 символа',
        'string.max': 'Имя не должно превышать 30 символов',
      }),
    about: Joi.string().min(2).max(200).optional()
      .messages({
        'string.min': 'Описание должно содержать минимум 2 символа',
        'string.max': 'Описание не должно превышать 200 символов',
      }),
    avatar: Joi.string().uri().optional().messages({
      'string.uri': 'Поле "avatar" должно содержать корректный URL',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно содержать корректный адрес электронной почты',
      'any.required': 'Поле "email" обязательно для заполнения',
    }),
    password: Joi.string()
      .min(6)
      .max(50)
      .required()
      .messages({
        'string.min': 'Пароль должен содержать минимум 6 символов',
        'string.max': 'Пароль не должен превышать 50 символов',
        'any.required': 'Поле "password" обязательно для заполнения',
      }),
  }),
});

// Схема валидации для авторизации пользователя
export const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно содержать корректный адрес электронной почты',
      'any.required': 'Поле "email" обязательно для заполнения',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" обязательно для заполнения',
    }),
  }),
});

// Схема валидации для получения пользователя по ID
export const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
      .messages({
        'string.hex': 'ID пользователя должен быть в формате ObjectId',
        'string.length': 'ID пользователя должен содержать 24 символа',
        'any.required': 'ID пользователя обязателен',
      }),
  }),
});

// Схема валидации для обновления профиля пользователя
export const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Имя должно содержать минимум 2 символа',
        'string.max': 'Имя не должно превышать 30 символов',
        'any.required': 'Поле "name" обязательно для заполнения',
      }),
    about: Joi.string().min(2).max(200).required()
      .messages({
        'string.min': 'Описание должно содержать минимум 2 символа',
        'string.max': 'Описание не должно превышать 200 символов',
        'any.required': 'Поле "about" обязательно для заполнения',
      }),
  }),
});

// Схема валидации для обновления аватара
export const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required().messages({
      'string.uri': 'Поле "avatar" должно содержать корректный URL',
      'any.required': 'Поле "avatar" обязательно для заполнения',
    }),
  }),
});
