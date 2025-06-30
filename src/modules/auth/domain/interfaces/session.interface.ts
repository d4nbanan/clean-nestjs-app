import { UserId } from '../../../user/domain/entities/user.entity';

export interface ISession {
  refreshToken: string;
  userId: UserId;
  createdAt: Date;
}
