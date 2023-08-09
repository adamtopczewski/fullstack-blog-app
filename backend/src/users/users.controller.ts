import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Temporary endopints; finally should be in auth module;
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch('/edit/:id')
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: FindOneParams) {
    return this.usersService.remove(Number(id));
  }
}

export default UsersController;
