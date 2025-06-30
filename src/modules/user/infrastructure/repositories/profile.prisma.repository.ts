import { IProfileRepository } from '../../domain/interfaces/profile-repository.interface';
import { ProfileEntity, ProfileId } from '../../domain/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ProfilePrismaMapper } from '../mappers/profile.prisma.mapper';
import { UserId } from '../../domain/entities/user.entity';

@Injectable()
export class ProfilePrismaRepository implements IProfileRepository {
  constructor(
    private prisma: PrismaService,
    private profileMapper: ProfilePrismaMapper,
  ) {}

  public async findOneById(
    profileId: ProfileId,
  ): Promise<ProfileEntity | null> {
    const profileModel = await this.prisma.profile.findUnique({
      where: { profileId: profileId.get() },
    });

    if (!profileModel) return null;

    return this.profileMapper.toEntity(profileModel);
  }

  public async findOneByUserId(userId: UserId): Promise<ProfileEntity | null> {
    const profileModel = await this.prisma.profile.findUnique({
      where: { userId: userId.get() },
    });

    if (!profileModel) return null;

    return this.profileMapper.toEntity(profileModel);
  }
}
