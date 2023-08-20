import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: string;
}

export class FindOneBySlugParams {
  @IsString()
  slug: string;
}