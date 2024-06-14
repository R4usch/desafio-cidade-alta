import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByAuthorizationCode(token: string): Promise<User> {
    return this.userRepository.findOneBy({ token });
  }
}
