// src/user/user.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '../auth/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body(ValidationPipe) credentials: RegisterDto) {
    return this.userService.create(credentials);
  }
}
