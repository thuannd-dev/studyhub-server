import { UserEntity } from './user.entity';

export interface UserRO {
  user: UserEntity;
}
export interface UsersRO {
  users: UserEntity[];
  usersCount: number;
}
