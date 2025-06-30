import { Inject, Injectable } from '@nestjs/common';
import {
  IProfileRepository,
  ProfileRepositoryToken,
} from '../../domain/interfaces/profile-repository.interface';
import { ProfileEntity, ProfileId } from '../../domain/entities/profile.entity';
import { ProfileNotFoundError } from '../errors/profile-not-found.error';
import { Profile } from '@prisma/client';
import { UserId } from '../../domain/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepositoryToken)
    private profileRepository: IProfileRepository,
  ) {}

  public async getOneByIdOtherwiseThrowError(
    profileId: ProfileId,
  ): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOneById(profileId);

    if (!profile) {
      throw new ProfileNotFoundError(profileId);
    }

    return profile;
  }

  public async getOneByUserIdOtherwiseThrowError(
    userId: UserId,
  ): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOneByUserId(userId);

    if (!profile) {
      throw new ProfileNotFoundError();
    }

    return profile;
  }
}
