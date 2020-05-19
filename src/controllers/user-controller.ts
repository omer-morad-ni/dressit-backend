import { BodyParams, Controller, Get, PathParams, Post } from '@tsed/common';
import { Returns, ReturnsArray } from '@tsed/swagger';
import { User } from '../entities/user';
import { UserCreation } from '../models/user-creation';
import { UserRepository } from '../repositories/user-repository';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post('/')
  @Returns(User)
  create(@BodyParams() user: UserCreation): Promise<User> {
    return this.userRepository.save(user);
  }

  @Get('/:id')
  @Returns(User)
  async get(@PathParams('id') id: string): Promise<User> {
    return this.userRepository.findByID(id);
  }

  @Get('/')
  @ReturnsArray(User)
  async getList(): Promise<User[]> {
    return this.userRepository.find();
  }
}
