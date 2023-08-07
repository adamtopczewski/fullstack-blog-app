import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersContorller {
  constructor(private readonly usersService: UsersService) {}

  // Temporary endopints; finally should be in auth module;
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
