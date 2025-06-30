import { ProfileType } from '../types/profile-type.enum';

export interface IProfile {
  firstName: string;
  lastName: string;
  type: ProfileType;
}
