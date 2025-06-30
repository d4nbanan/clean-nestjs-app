import { ApplicationError } from '../../../../shared/application/application.error';
import { ErrorCode } from '../../../../shared/api/exception-filter/error-code.enum';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('Invalid email or password', ErrorCode.INVALID_CREDENTIALS);
  }
}
