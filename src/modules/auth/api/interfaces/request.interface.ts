import { Request as ExpressRequest } from 'express';
import { UserId } from '../../../user/domain/entities/user.entity';

export interface JwtPayload {
  sub: UserId;
}

export interface Request extends ExpressRequest {
  cookies: Record<string, string>;
  user?: JwtPayload;
}
