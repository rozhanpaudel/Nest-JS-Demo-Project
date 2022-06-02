import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/User.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import createPagination from '../utils/paginationBuilder';
import constant from '../constants/index';

type LoginType = {
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(UserDto: UserDto, fileName): Promise<User> {
    try {
      const { username, password, isVerified } = UserDto;

      const hashedPW = await bcrypt.hash(password, 7);

      const user = await this.userRepository.findOne({ username });

      if (user) throw new BadRequestException('User Already Exists');

      return this.userRepository.save({
        username,
        password: hashedPW,
        image: `${constant.filePath}/${fileName}`,
        isVerified: isVerified ? isVerified : false,
      });
    } catch (e) {
      throw e;
    }
  }
  async loginUser(LoginData: LoginType) {
    const user = await this.userRepository.findOne({
      username: LoginData.username,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(LoginData.password, user.password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    //Generating token
    const payload = {
      id: user.id,
      email: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      msg: 'User LoggedIn',
      token: token,
      data: { id: user.id },
    };
  }

  async getAllUsers({ pageNumber, perPage }): Promise<User[]> {
    const pagination = createPagination({
      perPage,
      pageNumber,
    });

    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.products', 'product')
      .select(['user.username', 'user.id', 'user.isVerified'])
      .skip(pagination.offset)
      .take(pagination.perPage)
      .getMany();
  }
}
