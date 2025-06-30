import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '../../domain/interfaces/user-repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryToken) private userRepository: IUserRepository,
  ) {}

  public async create(userEntity: UserEntity) {
    const isUserExist = await this.userRepository.isEmailExist(
      userEntity.email,
    );
    if (isUserExist) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.create(userEntity);
  }

  public getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
