import { celebrate, Joi } from 'celebrate';

// Схема валидации для создания карточки
export const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      'string.min': 'Название карточки должно содержать минимум 2 символа',
      'string.max': 'Название карточки не должно превышать 30 символов',
      'any.required': 'Поле "name" обязательно для заполнения'
    }),
    link: Joi.string().uri().required().messages({
      'string.uri': 'Поле "link" должно содержать корректный URL',
      'any.required': 'Поле "link" обязательно для заполнения'
    })
  })
});

// Схема валидации для операций с карточкой по ID (удаление, лайк, дизлайк)
export const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'ID карточки должен быть в формате ObjectId',
      'string.length': 'ID карточки должен содержать 24 символа',
      'any.required': 'ID карточки обязателен'
    })
  })
});

// Для обратной совместимости
export const deleteCardValidation = cardIdValidation;