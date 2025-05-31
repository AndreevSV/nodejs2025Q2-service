import { User } from '../entities/user.entity';

export type ReturnUserDto = Omit<User, 'password'>;
