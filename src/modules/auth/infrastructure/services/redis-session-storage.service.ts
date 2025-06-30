import { ISessionStorage } from '../interfaces/session-storage.interface';
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { CryptoService } from '../../../crypto/crypto.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { SessionEntity } from '../../domain/entities/session.entity';
import {
  CryptoServiceToken,
  ICryptoService,
} from '../../../crypto/crypto-service.interface';
import { IAuthConfig, IRedisConfig } from '../../../../config/app-config';
import { Config } from '../../../../config/config.enum';

@Injectable()
export class RedisSessionStorageService implements ISessionStorage {
  private readonly Client: Redis;
  private readonly redisConfig: IRedisConfig;
  private readonly authConfig: IAuthConfig;

  constructor(
    @Inject(CryptoServiceToken) private readonly cryptoService: ICryptoService,
    private readonly configService: ConfigService,
  ) {
    this.redisConfig = this.configService.get<IRedisConfig>(
      Config.RedisConfig,
    )!;
    this.authConfig = this.configService.get<IAuthConfig>(Config.AuthConfig)!;
    this.Client = new Redis(this.redisConfig);
  }

  public async addSession(
    userEntity: UserEntity,
    sessionEntity: SessionEntity,
  ) {
    await this.Client.set(
      `jwt-session:${sessionEntity.refreshToken}`,
      userEntity.id!.toString(),
      'EX',
      this.authConfig.refreshPeriod / 1000,
    );
  }

  public async removeSession(sessionId: string) {
    await this.Client.del(`session:${sessionId}`);
  }

  public async checkSession(token: string) {
    const userId = await this.Client.get(`jwt-session:${token}`);
    if (!userId) {
      return null;
    }

    return Number(userId);
  }
}
