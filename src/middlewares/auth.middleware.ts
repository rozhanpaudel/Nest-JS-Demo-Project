// import {
//   BadRequestException,
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(private readonly jwtService: JwtService) {}
//   use(req: Request, res: Response, next: NextFunction) {
//     if (!req.headers['x-access-token'])
//       throw new BadRequestException('Token Must Be Provided');
//     const token = req.headers['x-access-token'];
//     const payload = this.jwtService.verify(token,{})

//     next();
//   }
// }
