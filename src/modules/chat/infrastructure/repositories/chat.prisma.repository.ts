import { IRepository } from '../../../../shared/application/interfaces/repository.interface';
import { ChatEntity } from '../../domain/entities/chat.entity';
import { Injectable } from '@nestjs/common';
import { ChatPrismaMapper } from '../mappers/chat.prisma.mapper';
import { PrismaService } from '../../../database/prisma.service';
import { ProfilePrismaMapper } from '../../../user/infrastructure/mappers/profile.prisma.mapper';
import { IChatRepository } from '../../domain/interfaces/chat-repository.interface';

@Injectable()
export class ChatPrismaRepository implements IChatRepository {
  constructor(
    private chatMapper: ChatPrismaMapper,
    private profileMapper: ProfilePrismaMapper,
    private prisma: PrismaService,
  ) {}

  public async create(chatEntity: ChatEntity): Promise<ChatEntity> {
    const data = this.chatMapper.toModel(chatEntity);

    const userModel = await this.prisma.chat.create({
      data,
      include: { profiles: true },
    });

    return this.chatMapper.toEntity({
      ...userModel,
      profiles: userModel.profiles.map((profile) =>
        this.profileMapper.toEntity(profile),
      ),
    });
  }
}
