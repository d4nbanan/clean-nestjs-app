import { Module } from '@nestjs/common';
import { ChatController } from './api/controllers/chat.controller';
import { ChatService } from './application/services/chat.service';
import { ChatPrismaMapper } from './infrastructure/mappers/chat.prisma.mapper';
import { ChatRepositoryToken } from './domain/interfaces/chat-repository.interface';
import { ChatPrismaRepository } from './infrastructure/repositories/chat.prisma.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatPrismaMapper,
    {
      provide: ChatRepositoryToken,
      useClass: ChatPrismaRepository,
    },
  ],
})
export class ChatModule {}
