import { ProfileEntity } from '../entities/profile.entity';

export interface IUser {
  email: string;
  password: string;
  profile: ProfileEntity;
}
