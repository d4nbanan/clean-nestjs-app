import { UserEntity } from '../../../user/domain/entities/user.entity';
import { SessionEntity } from '../../domain/entities/session.entity';

export const SessionStoreToken = Symbol('SESSION_STORAGE');

export interface ISessionStorage {
  addSession(
    userEntity: UserEntity,
    sessionEntity: SessionEntity,
  ): Promise<void>;
  checkSession(token: string): Promise<number | null>;
  removeSession(token: string): Promise<void>;
}
