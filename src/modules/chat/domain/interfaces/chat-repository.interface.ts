import { IRepository } from '../../../../shared/application/interfaces/repository.interface';
import { ChatEntity } from '../entities/chat.entity';

export const ChatRepositoryToken = Symbol('ChatRepositoryToken');
export interface IChatRepository extends IRepository<ChatEntity> {}
