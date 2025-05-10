import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersRO } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Define your endpoints here
  @Get()
  async getAllUsers(): Promise<UsersRO> {
    return await this.userService.findAll();
  }
}
