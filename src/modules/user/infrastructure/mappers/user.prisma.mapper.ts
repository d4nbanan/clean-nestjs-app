import { UserEntity, UserId } from '../../domain/entities/user.entity';
import { Prisma } from '@prisma/client';
import { UserPrismaExtType } from '../types/user.types';
import { PrismaMapper } from '../../../../shared/infrastructure/prisma/interfaces/prisma.mapper';
import { ProfilePrismaMapper } from './profile.prisma.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaMapper
  implements
    PrismaMapper<UserEntity, UserPrismaExtType, Prisma.UserUncheckedCreateInput>
{
  constructor(private profileMapper: ProfilePrismaMapper) {}

  toEntity(raw: UserPrismaExtType) {
    return new UserEntity({
      ...raw,
      id: new UserId(raw.userId),
      profile: this.profileMapper.toEntity(raw.profile),
    });
  }

  toModel(entity: UserEntity) {
    return {
      email: entity.email,
      password: entity.password,
    };
  }
}
