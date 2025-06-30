import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoServiceToken } from './crypto-service.interface';

@Module({
  providers: [
    {
      provide: CryptoServiceToken,
      useClass: CryptoService,
    },
  ],
  exports: [CryptoServiceToken],
})
export class CryptoModule {}
