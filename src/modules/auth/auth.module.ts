import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtAuthService } from './infrastructure/services/jwt-auth.service';
import { RedisSessionStorageService } from './infrastructure/services/redis-session-storage.service';
import { SessionStoreToken } from './infrastructure/interfaces/session-storage.interface';
import { CryptoModule } from '../crypto/crypto.module';
import { CookieManagerService } from '../../shared/infrastructure/http/cookie-manager.service';

@Module({
  imports: [JwtModule.register({ global: true }), UserModule, CryptoModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthService,
    {
      provide: SessionStoreToken,
      useClass: RedisSessionStorageService,
    },
    CookieManagerService,
  ],
})
export class AuthModule {}
