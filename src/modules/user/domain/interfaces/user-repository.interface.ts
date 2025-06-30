import { UserEntity } from '../entities/user.entity';
import { IRepository } from '../../../../shared/application/interfaces/repository.interface';

export const UserRepositoryToken = Symbol('UserRepositoryToken');
export interface IUserRepository extends IRepository<UserEntity> {
  isEmailExist(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
