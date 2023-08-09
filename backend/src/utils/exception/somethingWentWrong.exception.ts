import { HttpException, HttpStatus } from '@nestjs/common';

export default class SomethingWentWrongException extends HttpException {
  constructor() {
    super('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
