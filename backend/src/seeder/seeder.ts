import { Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import UsersService from 'src/users/users.service';
import { testAdmin, seedData } from './data';

@Injectable()
export default class Seeder {
  constructor(
    private userService: UsersService,
    private postsService: PostsService,
  ) {}

  async seed() {
    const user = await this.userService.create(testAdmin);
    // TODO: expand seeding functionality
    for (let i = 1; i < 17; i++) {
      await this.postsService.create({
        ...seedData,
        title: seedData.title + ' #' + i,
        published: true,
      }, user);
    }
  }
}
