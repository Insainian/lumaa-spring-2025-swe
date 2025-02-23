import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userDto: UserDto = { username, password };
    const user = await this.authService.validateUser(userDto);
    if (!user) {
      throw new UnauthorizedException("Couldn't validate username/password");
    }
    return user;
  }
}
