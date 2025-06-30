import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserId } from '../../../user/domain/entities/user.entity';
import { IAuthConfig } from '../../../../config/app-config';
import { Config } from '../../../../config/config.enum';

@Injectable()
export class JwtAuthService {
  private readonly authConfig: IAuthConfig;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.authConfig = this.configService.get<IAuthConfig>(Config.AuthConfig)!;
  }

  public async generateTokens(payload: { sub: UserId }) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.authConfig.accessSecret,
        expiresIn: this.authConfig.accessPeriod,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.authConfig.refreshSecret,
        expiresIn: this.authConfig.refreshPeriod,
      }),
    ]);

    return {
      refresh_token: rt,
      access_token: at,
    };
  }
}
