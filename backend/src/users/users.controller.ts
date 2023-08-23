import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindOneParams } from 'src/utils/findOneParams';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import Role from './role.enum';
import RoleGuard from 'src/auth/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(RoleGuard(Role.Admin))
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Patch('/edit/:id')
  @UseGuards(RoleGuard(Role.Admin))
  async updateUser(
    @Param() { id }: FindOneParams,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.update(Number(id), user);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async deleteUser(@Param() { id }: FindOneParams) {
    return this.usersService.remove(Number(id));
  }
}

export default UsersController;
