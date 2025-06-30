import { Brand, EntityId } from '../../../../shared/domain/types/entity-id';
import { IEntity } from '../../../../shared/domain/interfaces/entity.interface';
import { IMessage } from '../interfaces/message.interface';
import { ProfileId } from '../../../user/domain/entities/profile.entity';
import { ChatId } from './chat.entity';

type BrandName = 'MessageId';
type IdType = number;

export class MessageId extends EntityId<BrandName, IdType> {
  constructor(value: IdType) {
    super(value as Brand<IdType, BrandName>);
  }
}

export class MessageEntity implements IEntity<MessageId>, IMessage {
  public readonly id: MessageId;
  public readonly chatId: ChatId;
  public readonly author: ProfileId;
  public readonly text: string;

  constructor(props: IMessage & { id?: MessageId }) {
    this.id = this.id!;
    this.chatId = props.chatId;
    this.author = props.author;
    this.text = props.text;
  }
}
