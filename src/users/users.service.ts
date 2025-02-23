import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async register(userDto: UserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: userDto.username },
    });

    if (existingUser) {
      throw new ConflictException('User exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltRounds);
    const user = this.usersRepository.create({
      username: userDto.username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
