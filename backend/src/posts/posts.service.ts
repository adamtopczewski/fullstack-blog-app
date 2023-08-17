import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import PostNotFoundException from './exception/postNotFound.exception';
import PostWithSlugNotFoundException from './exception/postWithSlugNotFound.exception';
import User from 'src/users/entities/user.entity';
import { slugify } from 'src/utils/helpers';
import CategoriesService from 'src/categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService,
  ) {}

  // Todo add UniqueViolation handling
  async create(postData: CreatePostDto, user: User) {
    const slug = await this.generateSlug(postData.title);
    const categories =
      postData.categories &&
      (await this.categoriesService.getCategoriesByIds(postData.categories));
    const post = this.postRepository.create({
      ...postData,
      slug,
      author: user,
      categories,
    });
    await this.postRepository.save(post);
    return post;
  }

  async update(id: number, postData: UpdatePostDto, author: User) {
    const categories =
      postData.categories &&
      (await this.categoriesService.getCategoriesByIds(postData.categories));
    await this.isPostAuthor(id, author);
    if (!postData.title) {
      await this.postRepository.update(id, { ...postData, categories });
    } else {
      const slug = await this.generateSlug(postData.title);
      await this.postRepository.update(id, {
        ...postData,
        slug,
        categories,
      });
    }

    const updatedPost = await this.postRepository.findOneBy({ id });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async remove(id: number) {
    const deletedPostResponse = await this.postRepository.delete(id);
    if (!deletedPostResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }

  async findAll() {
    return await this.postRepository.find({ relations: ['author'] });
  }

  async findById(id: number) {
    const post = this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async findBySlug(slug: string) {
    const post = this.postRepository.findOne({
      where: {
        slug,
      },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new PostWithSlugNotFoundException(slug);
  }

  async findByAuthor(author) {
    const post = this.postRepository.find({
      where: {
        author,
      },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new NotFoundException(
      `There were no post for user with id ${author.id}`,
    );
  }

  async isPostAuthor(id: number, author: User) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    if (post.author === author) {
      return true;
    }
    throw new HttpException(
      "You don't have permission to edit this post",
      HttpStatus.UNAUTHORIZED,
    );
  }

  generateSlug(title: string) {
    return slugify(title);
  }
}
