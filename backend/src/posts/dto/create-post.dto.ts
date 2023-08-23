import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  summary: string;

  @IsBoolean()
  published: boolean;

  @IsArray()
  @IsOptional()
  categories: number[];
}
