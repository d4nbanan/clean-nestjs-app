import { IEntity } from '../../../../shared/domain/interfaces/entity.interface';
import { Brand, EntityId } from '../../../../shared/domain/types/entity-id';
import { IProfile } from '../interfaces/profile.interface';
import { ProfileType } from '../types/profile-type.enum';

type BrandName = 'ProfileId';
export class ProfileId extends EntityId<BrandName, number> {
  constructor(value: number) {
    super(value as Brand<number, 'ProfileId'>);
  }
}

export class ProfileEntity implements IEntity<ProfileId>, IProfile {
  public readonly id?: ProfileId;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly type: ProfileType;

  constructor(props: IProfile & { id?: EntityId<BrandName, number> }) {
    this.id = props.id;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.type = props.type;
  }

  public copyWith(props: Partial<IProfile>): ProfileEntity {
    return new ProfileEntity({
      id: this.id,
      firstName: props.firstName ?? this.firstName,
      lastName: props.lastName ?? this.lastName,
      type: props.type ?? this.type,
    });
  }
}
