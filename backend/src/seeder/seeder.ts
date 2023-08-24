import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import UsersService from 'src/users/users.service';
import { testAdmin, seedData, testCategories } from './data';
import CategoriesService from 'src/categories/categories.service';

@Injectable()
export default class Seeder {
  constructor(
    private userService: UsersService,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
  ) {}

  async seed() {
    const SEED_CATEGORY_ARTICLES_COUNT = 8;
    const user = await this.userService.createAdmin(testAdmin);
    const post = await this.postsService.findAll();

    for (let i = 0; i < testCategories.length; i++) {
      const createdCategory = await this.categoriesService.createTest({
        name: testCategories[i],
      });

      if (post.length) {
        throw new Error('There already are posts in database');
      }

      for (let i = 0; i < SEED_CATEGORY_ARTICLES_COUNT; i++) {
        const articleNumber: number = i + 1;
        await this.postsService.create(
          {
            ...seedData,
            title: `${seedData.title} ${createdCategory.name} #${articleNumber}`,
            published: true,
            categories: [createdCategory.id],
          },
          user,
        );
      }
    }
  }

  async seedAdminOnly() {
    const user = await this.userService.createAdmin(testAdmin);
    return user;
  }
}
