import { ErrorCode } from '../api/exception-filter/error-code.enum';

export abstract class ApplicationError extends Error {
  public readonly code: ErrorCode;

  protected constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }
}
