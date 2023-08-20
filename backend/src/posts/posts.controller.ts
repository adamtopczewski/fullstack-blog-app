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
import JwtAuthenticationGuard from 'src/auth/jwtAuthentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { FindOneBySlugParams, FindOneParams } from 'src/utils/findOneParams';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //TODO public endpoints for posts with pagination
  @Post()
  @UseGuards(JwtAuthenticationGuard)
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

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('id') { id }: FindOneParams,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: RequestWithUser,
  ) {
    return this.postsService.update(+id, updatePostDto, request.user);
  }

  @Delete(':id')
  remove(@Param('id') { id }: FindOneParams) {
    return this.postsService.remove(+id);
  }
}
