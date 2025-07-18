import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '../../../modules/auth/api/interfaces/request.interface';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
