import { PrismaMapper } from '../../../../shared/infrastructure/prisma/interfaces/prisma.mapper';
import { Chat, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ChatEntity } from '../../domain/entities/chat.entity';
import { ProfileEntity } from '../../../user/domain/entities/profile.entity';

@Injectable()
export class ChatPrismaMapper
  implements PrismaMapper<ChatEntity, Chat, Prisma.ChatUncheckedCreateInput>
{
  public toEntity(raw: Chat & { profiles: ProfileEntity[] }): ChatEntity {
    return new ChatEntity({
      ...raw,
      profileIds: raw.profiles.map((profile) => profile.id!),
    });
  }

  public toModel(entity: ChatEntity): Prisma.ChatUncheckedCreateInput {
    return {
      chatId: entity.id.get(),
      profiles: {
        connect: entity.profileIds.map((profileId) => ({
          profileId: profileId.get(),
        })),
      },
    };
  }
}
