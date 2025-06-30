import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { HttpModule } from './shared/infrastructure/http/http.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './shared/api/exception-filter/exception-filter';
import { ConfigModule } from '@nestjs/config';
import {
  AppConfig,
  AuthConfig,
  DatabaseConfig,
  RedisConfig,
} from './config/app-config';
import { validationSchema } from './config/validation-schema';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, RedisConfig, AuthConfig],
      validationSchema,
    }),
    HttpModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
