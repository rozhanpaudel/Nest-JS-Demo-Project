import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h2 style="text-align: center; ">Welcome to the newly created Nest JS Application.</h2> ';
  }
}
