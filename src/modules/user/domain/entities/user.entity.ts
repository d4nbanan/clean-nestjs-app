import { IEntity } from '../../../../shared/domain/interfaces/entity.interface';
import { Brand, EntityId } from '../../../../shared/domain/types/entity-id';
import { ProfileEntity } from './profile.entity';
import { IUser } from '../interfaces/user.interface';

type BrandName = 'UserId';
type IdType = number;
export class UserId extends EntityId<BrandName, IdType> {
  constructor(value: IdType) {
    super(value as Brand<IdType, 'UserId'>);
  }
}

export class UserEntity implements IEntity<UserId>, IUser {
  public readonly id?: UserId;
  public readonly email: string;
  public readonly password: string;
  public readonly profile: ProfileEntity;

  constructor(props: IUser & { id?: UserId }) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.profile = props.profile;
  }

  public copyWith(props: Partial<IUser>): UserEntity {
    return new UserEntity({
      id: this.id,
      email: props.email ?? this.email,
      password: props.password ?? this.password,
      profile: props.profile ?? this.profile,
    });
  }
}
