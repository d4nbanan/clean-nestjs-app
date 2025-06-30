import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserController } from './api/controllers/user.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserRepositoryToken } from './domain/interfaces/user-repository.interface';
import { ProfilePrismaMapper } from './infrastructure/mappers/profile.prisma.mapper';
import { UserPrismaMapper } from './infrastructure/mappers/user.prisma.mapper';
import { UserApiMapper } from './api/mappers/user.api.mapper';
import { ProfileService } from './application/services/profile.service';
import { ProfileRepositoryToken } from './domain/interfaces/profile-repository.interface';
import { ProfilePrismaRepository } from './infrastructure/repositories/profile.prisma.repository';

@Module({
  providers: [
    UserService,
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: ProfileRepositoryToken,
      useClass: ProfilePrismaRepository,
    },
    UserPrismaMapper,
    ProfilePrismaMapper,
    UserApiMapper,
    ProfileService,
  ],
  controllers: [UserController],
  exports: [UserService, UserApiMapper, ProfilePrismaMapper, ProfileService],
})
export class UserModule {}
