import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('IP Address:', req.ip);
    // console.log('Path:', req.path);
    // console.log('Headers:', req.headers);
    next();
  }
}
