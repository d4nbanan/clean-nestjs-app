import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { SignUpLocalReqDto } from '../dtos/request/sign-up-local.req.dto';
import { SignInLocalReqDto } from '../dtos/request/sign-in-local.req.dto';
import { UserApiMapper } from '../../../user/api/mappers/user.api.mapper';
import { CookieManagerService } from '../../../../shared/infrastructure/http/cookie-manager.service';
import {
  CryptoServiceToken,
  ICryptoService,
} from '../../../crypto/crypto-service.interface';
import { JwtAuthService } from '../../infrastructure/services/jwt-auth.service';
import { Response } from 'express';
import {
  ISessionStorage,
  SessionStoreToken,
} from '../../infrastructure/interfaces/session-storage.interface';
import { SessionEntity } from '../../domain/entities/session.entity';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieManager: CookieManagerService,
    private userApiMapper: UserApiMapper,
    @Inject(CryptoServiceToken) private cryptoService: ICryptoService,
    private jwtAuthService: JwtAuthService,
    @Inject(SessionStoreToken) private sessionStore: ISessionStorage,
  ) {}

  private async createSession(response: Response, user: UserEntity) {
    const { access_token, refresh_token } =
      await this.jwtAuthService.generateTokens({ sub: user.id! });

    const session = new SessionEntity({
      userId: user.id!,
      refreshToken: refresh_token,
      createdAt: new Date(),
    });
    await this.sessionStore.addSession(user, session);
    this.cookieManager.setToken(
      response,
      AuthGuard.TOKEN_COOKIE_NAME,
      access_token,
    );
  }

  @ApiOperation({
    summary: 'Sign In with email and password',
    description: 'The user will be authorized with jwt tokens in the cookies',
  })
  @Post('local/signIn')
  public async signInLocal(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignInLocalReqDto,
  ) {
    const user = await this.authService.signInLocal(dto.email, dto.password);
    await this.createSession(response, user);
  }

  @ApiOperation({
    summary: 'Initialize Sign Up with email and password',
  })
  @Post('local/signUp')
  public async signUpLocal(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignUpLocalReqDto,
  ) {
    const hashedPassword = await this.cryptoService.hash(dto.password);

    const user = await this.authService.signUpLocal(
      this.userApiMapper.toEntity({
        ...dto,
        password: hashedPassword,
      }),
    );

    await this.createSession(response, user);
  }
}
