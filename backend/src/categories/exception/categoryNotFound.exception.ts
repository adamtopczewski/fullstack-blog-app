import { NotFoundException } from '@nestjs/common';

export default class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super('Category not found');
  }
}
