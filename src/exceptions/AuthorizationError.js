import ClientError from './ClientError.js';

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = 'AuthenticationError';
  }
}

export default AuthorizationError;