import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/utils/helpers';
import Category from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import CategoryNotFoundException from './exception/categoryNotFound.exception';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import SomethingWentWrongException from 'src/utils/exception/somethingWentWrong.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(categoryData: CreateCategoryDto) {
    const slug = this.generateSlug(categoryData.name);
    try {
      const category = await this.categoryRepository.create({
        ...categoryData,
        slug,
      });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(
          'Category with provided name already exists.',
        );
      }
      throw new SomethingWentWrongException();
    }
  }

  async createTest(categoryData: CreateCategoryDto) {
    const slug = this.generateSlug(categoryData.name);
    const category = await this.categoryRepository.create({
      ...categoryData,
      slug,
    });
    await this.categoryRepository.upsert(category, ['name']);
    return category;
  }

  async update(id: number, categoryData: UpdateCategoryDto) {
    const slug = this.generateSlug(categoryData.name);
    await this.categoryRepository.update(id, { ...categoryData, slug });
    const updatedCategory = await this.categoryRepository.findOneBy({ id });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException();
  }

  async remove(id: number) {
    const deletedResponse = await this.categoryRepository.delete(id);
    if (!deletedResponse.affected) {
      throw new CategoryNotFoundException();
    }
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: ['posts'],
    });
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException();
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({
      where: { slug },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException();
  }

  async getCategoriesByIds(categories: number[]): Promise<Category[]> {
    const categoriesByIds = await this.categoryRepository.find({
      where: {
        id: In(categories),
      },
    });

    if (categoriesByIds.length === categories.length) {
      return categoriesByIds;
    }
    throw new NotFoundException(
      `Could not find categories based on provided ids - ${categories.join(
        ', ',
      )}.`,
    );
  }

  generateSlug(name) {
    return slugify(name);
  }
}
export default CategoriesService;
