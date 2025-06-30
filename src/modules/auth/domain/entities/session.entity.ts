import { Brand, EntityId } from '../../../../shared/domain/types/entity-id';
import { IEntity } from '../../../../shared/domain/interfaces/entity.interface';
import { ISession } from '../interfaces/session.interface';
import { UserId } from '../../../user/domain/entities/user.entity';

type BrandName = 'SessionId';
export class SessionId extends EntityId<BrandName, string> {
  constructor(value: string) {
    super(value as Brand<string, 'SessionId'>);
  }
}

export class SessionEntity implements IEntity<SessionId>, ISession {
  public readonly id?: SessionId;
  public readonly refreshToken: string;
  public readonly userId: UserId;
  public readonly createdAt: Date;

  constructor(props: ISession & { id?: SessionId }) {
    this.id = props.id;
    this.refreshToken = props.refreshToken;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
  }
}
