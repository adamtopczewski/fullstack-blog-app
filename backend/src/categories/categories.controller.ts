import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CategoriesService from './categories.service';
import UpdateCategoryDto from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindOneBySlugParams, FindOneParams } from 'src/utils/findOneParams';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') { id }: FindOneParams) {
    return this.categoriesService.findById(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') { slug }: FindOneBySlugParams) {
    return this.categoriesService.findBySlug(slug);
  }

  @Patch(':id')
  update(
    @Param('id') { id }: FindOneParams,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') { id }: FindOneParams) {
    return this.categoriesService.remove(+id);
  }
}

export default CategoriesController;
