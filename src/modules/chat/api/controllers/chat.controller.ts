import {
  Controller,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from '../../application/services/chat.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/api/guards/auth.guard';
import { CreateChatReqDto } from '../dtos/request/create-chat.req.dto';
import { ProfileService } from '../../../user/application/services/profile.service';
import { JwtPayload } from '../../../auth/api/interfaces/request.interface';
import { RequestUser } from '../../../../shared/api/decorators/request-user';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private profileService: ProfileService,
  ) {}

  @ApiOperation({
    summary: `To create a new chat (without an offer)`,
    description: `If there is an already created chat between you and targetProfile without an offer and with no messages so then the endpoint returns that chat`,
  })
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Query() dto: CreateChatReqDto,
    @RequestUser() user: JwtPayload,
  ) {
    const initiatorProfile =
      await this.profileService.getOneByUserIdOtherwiseThrowError(user.sub);

    return this.chatService.createChat([
      initiatorProfile.id!,
      dto.targetProfile,
    ]);
  }
}
