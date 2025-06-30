import { ProfileEntity, ProfileId } from '../../domain/entities/profile.entity';
import { Prisma, Profile } from '@prisma/client';
import { ProfileType } from '../../domain/types/profile-type.enum';
import { PrismaMapper } from '../../../../shared/infrastructure/prisma/interfaces/prisma.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilePrismaMapper
  implements
    PrismaMapper<
      ProfileEntity,
      Profile,
      Prisma.ProfileUncheckedCreateWithoutUserInput
    >
{
  toEntity(raw: Profile) {
    return new ProfileEntity({
      ...raw,
      id: new ProfileId(raw.profileId),
      type: raw.type as ProfileType,
    });
  }

  toModel(entity: ProfileEntity) {
    return {
      firstName: entity.firstName,
      lastName: entity.lastName,
      type: entity.type,
    };
  }
}
