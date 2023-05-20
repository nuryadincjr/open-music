import CoverHandlersSchema from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const CoversValidator = {
  validateCoverHandlers: (headers) => {
    const validationResult = CoverHandlersSchema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default CoversValidator;
