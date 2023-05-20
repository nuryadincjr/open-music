import Joi from 'joi';

const CoverHandlersSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
    )
    .required(),
}).unknown();

export default CoverHandlersSchema;
