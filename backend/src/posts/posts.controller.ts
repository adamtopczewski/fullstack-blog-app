import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { FindOneBySlugParams, FindOneParams } from 'src/utils/findOneParams';
import Role from 'src/users/role.enum';
import RoleGuard from 'src/auth/role.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //TODO public endpoints for posts with pagination
  @Post()
  @UseGuards(RoleGuard(Role.Writer))
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() request: RequestWithUser,
  ) {
    return this.postsService.create(createPostDto, request.user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') { id }: FindOneParams) {
    return this.postsService.findById(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') { slug }: FindOneBySlugParams) {
    return this.postsService.findBySlug(slug);
  }

  // TODO: Only self articles
  @Patch(':id')
  @UseGuards(RoleGuard(Role.Writer))
  update(
    @Param('id') { id }: FindOneParams,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: RequestWithUser,
  ) {
    return this.postsService.update(+id, updatePostDto, request.user);
  }

  // TODO: Only self articles
  @Delete(':id')
  @UseGuards(RoleGuard(Role.Writer))
  remove(@Param('id') { id }: FindOneParams, @Req() request: RequestWithUser) {
    return this.postsService.remove(+id);
  }
}
