import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { UserPrismaMapper } from '../mappers/user.prisma.mapper';
import { PrismaService } from '../../../database/prisma.service';
import { ProfilePrismaMapper } from '../mappers/profile.prisma.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaService,
    private userMapper: UserPrismaMapper,
    private profileMapper: ProfilePrismaMapper,
  ) {}

  public async create(userEntity: UserEntity): Promise<UserEntity> {
    const data = this.userMapper.toModel(userEntity);

    const userModel = await this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: this.profileMapper.toModel(userEntity.profile),
        },
      },
      include: { profile: true },
    });

    return this.userMapper.toEntity({
      ...userModel,
      profile: userModel.profile!,
    });
  }

  public async isEmailExist(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findUnique({ where: { email } }));
  }

  public async findByEmail(email: string) {
    const userModel = await this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!userModel) return null;

    return this.userMapper.toEntity({
      ...userModel,
      profile: userModel.profile!,
    });
  }
}
