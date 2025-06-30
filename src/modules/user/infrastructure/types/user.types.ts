import { Profile, User } from '@prisma/client';

export type UserPrismaExtType = User & {
  profile: Profile;
};
