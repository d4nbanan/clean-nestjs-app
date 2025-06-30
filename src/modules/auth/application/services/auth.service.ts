import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../../user/application/services/user.service';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import {
  CryptoServiceToken,
  ICryptoService,
} from '../../../crypto/crypto-service.interface';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(CryptoServiceToken) private cryptoService: ICryptoService,
  ) {}

  public async signInLocal(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordValid = await this.cryptoService.validate(
      password,
      user.password,
    );
    if (!isPasswordValid) throw new InvalidCredentialsError();

    return user;
  }

  public async signUpLocal(userEntity: UserEntity) {
    return this.userService.create(userEntity);
  }
}
