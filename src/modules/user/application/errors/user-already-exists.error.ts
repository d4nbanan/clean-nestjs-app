import { ApplicationError } from '../../../../shared/application/application.error';
import { ErrorCode } from '../../../../shared/api/exception-filter/error-code.enum';

export class UserAlreadyExistsError extends ApplicationError {
  constructor() {
    super('User already exists', ErrorCode.USER_ALREADY_EXISTS);
  }
}
