import { celebrate, Joi } from 'celebrate';

// Схема валидации для создания пользователя
export const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Имя должно содержать минимум 2 символа',
      'string.max': 'Имя не должно превышать 30 символов',
      'any.required': 'Поле "name" обязательно для заполнения'
    }),
    about: Joi.string().min(2).max(200).required().messages({
      'string.min': 'Описание должно содержать минимум 2 символа',
      'string.max': 'Описание не должно превышать 200 символов',
      'any.required': 'Поле "about" обязательно для заполнения'
    }),
    avatar: Joi.string().uri().required().messages({
      'string.uri': 'Поле "avatar" должно содержать корректный URL',
      'any.required': 'Поле "avatar" обязательно для заполнения'
    })
  })
});

// Схема валидации для получения пользователя по ID
export const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'ID пользователя должен быть в формате ObjectId',
      'string.length': 'ID пользователя должен содержать 24 символа',
      'any.required': 'ID пользователя обязателен'
    })
  })
});

// Схема валидации для обновления профиля пользователя
export const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Имя должно содержать минимум 2 символа',
      'string.max': 'Имя не должно превышать 30 символов',
      'any.required': 'Поле "name" обязательно для заполнения'
    }),
    about: Joi.string().min(2).max(200).required().messages({
      'string.min': 'Описание должно содержать минимум 2 символа',
      'string.max': 'Описание не должно превышать 200 символов',
      'any.required': 'Поле "about" обязательно для заполнения'
    })
  })
});

// Схема валидации для обновления аватара
export const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required().messages({
      'string.uri': 'Поле "avatar" должно содержать корректный URL',
      'any.required': 'Поле "avatar" обязательно для заполнения'
    })
  })
});