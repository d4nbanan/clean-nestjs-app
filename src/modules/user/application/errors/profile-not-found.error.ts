import { ApplicationError } from '../../../../shared/application/application.error';
import { ProfileId } from '../../domain/entities/profile.entity';
import { ErrorCode } from '../../../../shared/api/exception-filter/error-code.enum';

export class ProfileNotFoundError extends ApplicationError {
  constructor(id?: ProfileId) {
    super(
      `Profile with id: ${id?.toString() ?? ''} wasn't found`,
      ErrorCode.PROFILE_NOT_FOUND,
    );
  }
}
