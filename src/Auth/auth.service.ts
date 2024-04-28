// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(credentials: RegisterDto) {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    return this.userService.create({ ...credentials, password: hashedPassword });
  }

  async login(credentials: LoginDto) {
    const user = await this.userService.findByUsername(credentials.username);

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async logout() {
    // Implement logout logic here
  }
}
