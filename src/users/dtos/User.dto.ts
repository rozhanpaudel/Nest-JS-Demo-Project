import { IsNotEmpty, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  isVerified: any;
}
