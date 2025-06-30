import { ProfileEntity, ProfileId } from '../entities/profile.entity';
import { UserId } from '../entities/user.entity';

export const ProfileRepositoryToken = Symbol('ProfileRepositoryToken');

export interface IProfileRepository {
  findOneById(profileId: ProfileId): Promise<ProfileEntity | null>;
  findOneByUserId(userId: UserId): Promise<ProfileEntity | null>;
}
