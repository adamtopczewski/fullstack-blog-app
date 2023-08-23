import { Module } from '@nestjs/common';
import Seeder from './seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Post from 'src/posts/entities/post.entity';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import UsersService from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import * as Joi from 'joi';
import { CategoriesModule } from 'src/categories/categories.module';
import CategoriesService from 'src/categories/categories.service';
import Category from 'src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Category]),
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
      }),
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
  ],
  providers: [
    Seeder,
    UsersService,
    PostsService,
    ConfigService,
    CategoriesService,
  ],
})
export class SeederModule {}
