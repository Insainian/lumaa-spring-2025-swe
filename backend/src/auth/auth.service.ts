import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto.username);
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(userDto.username);

    if (
      !(await bcrypt.compare(userDto.password, <string>user?.password)) ||
      !user
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
