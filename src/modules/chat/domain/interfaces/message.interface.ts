import { ChatId } from '../entities/chat.entity';
import { ProfileId } from '../../../user/domain/entities/profile.entity';

export interface IMessage {
  chatId: ChatId;
  author: ProfileId;
  text: string;
}
