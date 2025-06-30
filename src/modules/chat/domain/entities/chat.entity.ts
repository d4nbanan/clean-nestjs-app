import { IEntity } from '../../../../shared/domain/interfaces/entity.interface';
import { Brand, EntityId } from '../../../../shared/domain/types/entity-id';
import { IChat } from '../interfaces/chat.interface';
import {
  ProfileEntity,
  ProfileId,
} from '../../../user/domain/entities/profile.entity';

type BrandName = 'ChatId';
type IdType = number;
export class ChatId extends EntityId<BrandName, number> {
  constructor(value: IdType) {
    super(value as Brand<IdType, 'ChatId'>);
  }
}

export class ChatEntity implements IEntity<ChatId>, IChat {
  public readonly id: ChatId;
  public readonly profileIds: ProfileId[];
  public readonly profiles: ProfileEntity[];
  public readonly createdAt: Date;

  constructor(props: IChat & { id?: ChatId }) {
    this.id = props.id!;
    this.profileIds = props.profileIds;
    this.createdAt = props.createdAt!;
    this.profiles = props.profiles;
  }
}
