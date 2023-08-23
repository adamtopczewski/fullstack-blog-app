import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import UserNotFoundException from './exception/userNotFound.exception';
import Role from './role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async createAdmin(userData: CreateUserDto) {
    const admin = this.userRepository.create({
      ...userData,
      roles: [Role.Admin],
    });
    await this.userRepository.save(admin);
    return admin;
  }

  async update(id: number, userData: UpdateUserDto) {
    await this.userRepository.update(id, userData);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (updatedUser) {
      return updatedUser;
    }
    throw new UserNotFoundException();
  }

  async remove(id: number) {
    const userDeleteResponse = await this.userRepository.delete(id);
    if (!userDeleteResponse.affected) {
      throw new UserNotFoundException();
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new UserNotFoundException();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    throw new UserNotFoundException();
  }
}

export default UsersService;
