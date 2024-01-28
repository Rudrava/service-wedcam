import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  /**
   * @param data
   * @description this creates only a user type user
   * @returns
   */
  async create(data: CreateUserDto) {
    const user = this.userRepo.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    await this.userRepo.save(user);
    return user;
  }

  private async findOneByEmailOrCreate(email: string) {
    let user: User = await this.userRepo.findOneBy({
      email,
    });
    if (!user) {
      user = this.userRepo.create({
        email,
      });
      await this.userRepo.save(user);
    }
    return user;
  }

  /**
   * @param create if true then would create if the user is not found or else would throw error if not found
   * @description finds a user with email
   */
  async findOneByEmail(email: string, create = false) {
    if (!email) throw new Error('Email is required.');

    if (create) return this.findOneByEmailOrCreate(email);

    return this.userRepo.findOneByOrFail({
      email,
    });
  }
}
