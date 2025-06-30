import { ProfileId } from '../../../../user/domain/entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsIntDbId } from '../../../../../shared/api/validators/is-int-db-id';

export class CreateChatReqDto {
  @ApiProperty()
  @IsIntDbId(ProfileId)
  targetProfile: ProfileId;
}
