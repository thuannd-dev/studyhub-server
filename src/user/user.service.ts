import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsersRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UsersRO> {
    const users = await this.userRepository.find();
    const usersCount = await this.userRepository.count();
    const usersRO: UsersRO = { users, usersCount };
    return usersRO;
  }
}
