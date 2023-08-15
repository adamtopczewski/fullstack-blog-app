import { NotFoundException } from '@nestjs/common';

export default class PostWithSlugNotFoundException extends NotFoundException {
  constructor(slug: string) {
    super(`Post with slug ${slug} not found`);
  }
}
