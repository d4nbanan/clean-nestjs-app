import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationError } from '../../application/application.error';
import { Response } from 'express';
import { ErrorCode } from './error-code.enum';

const errorCodeToHttpStatus: Record<ErrorCode, number> = {
  [ErrorCode.USER_ALREADY_EXISTS]: 409,
  [ErrorCode.INVALID_CREDENTIALS]: 401,
  [ErrorCode.PROFILE_NOT_FOUND]: 404,
};

@Catch(ApplicationError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = errorCodeToHttpStatus[exception.code] ?? 400;

    response.status(status).json({
      statusCode: status,
      code: exception.code,
      message: exception.message,
      error: exception.name,
    });
  }
}
