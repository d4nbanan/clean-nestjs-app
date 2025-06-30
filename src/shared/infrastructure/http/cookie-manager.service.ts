import { CookieOptions, Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, IAuthConfig } from '../../../config/app-config';
import { Config } from '../../../config/config.enum';

@Injectable()
export class CookieManagerService {
  private readonly cookieOptions: CookieOptions;
  private readonly authConfig: IAuthConfig;
  private readonly appConfig: IAppConfig;

  constructor(private readonly configService: ConfigService) {
    this.appConfig = this.configService.get<IAppConfig>(Config.AppConfig)!;
    this.authConfig = this.configService.get<IAuthConfig>(Config.AuthConfig)!;

    this.cookieOptions = {
      maxAge: this.authConfig.refreshPeriod,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: this.appConfig.appDomain,
    };
  }

  setToken(response: Response, key: string, value: string): void {
    response.cookie(key, value, this.cookieOptions);
  }

  removeToken(response: Response, key: string) {
    response.clearCookie(key, this.cookieOptions);
  }
}
