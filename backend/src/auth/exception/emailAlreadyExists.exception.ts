import { BadRequestException } from '@nestjs/common';

export default class EmailAlreadyExistsException extends BadRequestException {
  constructor() {
    super('User with that email already exists');
  }
}
