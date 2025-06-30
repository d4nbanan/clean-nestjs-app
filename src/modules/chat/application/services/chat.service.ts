import { Inject, Injectable } from '@nestjs/common';
import {
  ChatRepositoryToken,
  IChatRepository,
} from '../../domain/interfaces/chat-repository.interface';
import {
  ProfileEntity,
  ProfileId,
} from '../../../user/domain/entities/profile.entity';
import { ChatEntity } from '../../domain/entities/chat.entity';
import { ProfileService } from '../../../user/application/services/profile.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(ChatRepositoryToken) private chatRepository: IChatRepository,
    private profileService: ProfileService,
  ) {}

  public async createChat(profileIds: ProfileId[]) {
    const profiles = await Promise.all(
      profileIds.map((profileId) =>
        this.profileService.getOneByIdOtherwiseThrowError(profileId),
      ),
    );

    const chat = new ChatEntity({
      profileIds,
      profiles,
    });

    await this.chatRepository.create(chat);
  }
}
