import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export default RegisterDto;
