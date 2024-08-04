import Joi from 'joi';

export const schemaValidation = (schema: Joi.ObjectSchema, data: any) => {
  return schema.validate(data, { abortEarly: false });
};
