import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/utils/helpers';
import Category from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(categoryData: CreateCategoryDto) {
    const slug = this.generateSlug(categoryData.name);
    const category = await this.categoryRepository.create({
      ...categoryData,
      slug,
    });
    await this.categoryRepository.save(category);
    return category;
  }

  async update(id: number, categoryData: UpdateCategoryDto) {
    const slug = this.generateSlug(categoryData.name);
    await this.categoryRepository.update(id, { ...categoryData, slug });
    const updatedCategory = await this.categoryRepository.findOneBy({ id });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new NotFoundException('Post not found');
  }

  async remove(id: number) {
    const deletedResponse = await this.categoryRepository.delete(id);
    if (!deletedResponse.affected) {
      throw new NotFoundException('Post not found');
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (category) {
      return category;
    }
    throw new NotFoundException('Post not found');
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({ where: { slug } });
    if (category) {
      return category;
    }
    throw new NotFoundException('Post not found');
  }

  generateSlug(name) {
    return slugify(name);
  }
}
export default CategoriesService;