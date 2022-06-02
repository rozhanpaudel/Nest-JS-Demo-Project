import { IsNotEmpty, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
