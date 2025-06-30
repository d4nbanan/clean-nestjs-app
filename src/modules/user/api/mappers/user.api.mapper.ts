import { Injectable } from '@nestjs/common';
import { CreateUserReqDto } from '../dtos/request/create-user.req.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';

@Injectable()
export class UserApiMapper {
  public toEntity(dto: CreateUserReqDto) {
    const profileEntity = new ProfileEntity({
      firstName: dto.firstName,
      lastName: dto.lastName,
      type: dto.type,
    });

    return new UserEntity({
      email: dto.email,
      password: dto.password,
      profile: profileEntity,
    });
  }
}
