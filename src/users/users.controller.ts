import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileOptions } from 'src/configs/multer.config';
import { LoginDto } from './dtos/Login.dto';
import { UserDto } from './dtos/User.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  async getAllUsers(@Query() query) {
    console.log(query);
    const users = await this.userService.getAllUsers(query);
    return { msg: 'Users Fetched', data: users };
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('image', {
      ...fileOptions,
    }),
  )
  async createUser(
    @Body() UserDto: UserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.registerUser(UserDto, file.filename);
    return {
      msg: 'User Created',
      data: user,
    };
  }

  @Post('/login')
  async loginUser(@Body() LoginDto: LoginDto) {
    return this.userService.loginUser({ ...LoginDto });
  }
}
