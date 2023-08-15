import { NotFoundException } from '@nestjs/common';

export default class PostNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Post with id ${id} not found`);
  }
}
