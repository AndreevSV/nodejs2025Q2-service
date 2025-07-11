import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, updateData: Partial<User>): User {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const user = this.users[index];

    const updatedUser = {
      ...user,
      ...updateData,
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
  }

  findByLogin(login: string): User | undefined {
    return this.users.find(
      (user) => user.login.toLowerCase() === login.toLowerCase(),
    );
  }

  findUserIndexByUserId(id: string): number {
    return this.users.findIndex((user) => user.id === id);
  }
}
