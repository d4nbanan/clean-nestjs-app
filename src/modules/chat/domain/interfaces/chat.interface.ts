import {
  ProfileEntity,
  ProfileId,
} from '../../../user/domain/entities/profile.entity';

export interface IChat {
  profileIds: ProfileId[];
  profiles: ProfileEntity[];
  createdAt?: Date;
}
