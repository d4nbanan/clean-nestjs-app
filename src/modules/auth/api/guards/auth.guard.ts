import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthConfig } from '../../../../config/app-config';
import { Config } from '../../../../config/config.enum';
import { UserId } from '../../../user/domain/entities/user.entity';
import { Request } from '../interfaces/request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  public static readonly TOKEN_COOKIE_NAME = 'token';
  private readonly ACCESS_TOKEN_SECRET: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.ACCESS_TOKEN_SECRET = this.configService.get<IAuthConfig>(
      Config.AuthConfig,
    )!.accessSecret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user: { sub: UserId } } = context
      .switchToHttp()
      .getRequest();
    const token = this.extractSessionFromCookies(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.ACCESS_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractSessionFromCookies(request: Request): string | undefined {
    return request.cookies[AuthGuard.TOKEN_COOKIE_NAME];
  }
}
