import { Module } from '@nestjs/common';
import { CookieManagerService } from './cookie-manager.service';

@Module({
  providers: [CookieManagerService],
  exports: [CookieManagerService],
})
export class HttpModule {}
