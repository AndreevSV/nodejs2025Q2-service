import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersRepository } from 'src/db/users.repository';
import { ReturnUserDto } from './dto/return-user.dto';
import { hashPassword, verifyPassword } from 'src/utils/password-utils';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const existingUser = await this.usersRepository.findByLogin(
      createUserDto.login,
    );

    if (existingUser) {
      throw new BadRequestException('User with given login already exist');
    }
    const { login, password } = createUserDto;

    const hashedPassword = await hashPassword(password);

    const user: User = {
      id: uuidv4(),
      login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const savedUser = this.usersRepository.createUser(user);
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async getUsers(): Promise<ReturnUserDto[]> {
    const allUsers = this.usersRepository.getUsers();
    const mappedUsers = allUsers.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return mappedUsers;
  }

  async getUser(id: string): Promise<ReturnUserDto> {
    const foundUser = this.usersRepository.getUser(id);

    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password: _, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<ReturnUserDto> {
    const user = this.usersRepository.getUser(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const isPasswordValid = await verifyPassword(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    const hashedPassword = await hashPassword(updatePasswordDto.newPassword);
    const updatedUser = this.usersRepository.updateUser(id, {
      password: hashedPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.usersRepository.findUserIndexByUserId(id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.usersRepository.deleteUser(index);
  }
}
