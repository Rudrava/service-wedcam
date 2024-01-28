import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @param userId user id to delete tokens against of
   * @description this doesn't delete the tokens off the db but just marks them deleted
   */
  private async invalidateTokens(userId: string) {
    await this.tokenRepo.softDelete({
      user: {
        id: userId,
      },
    });
  }

  /**
   * @param userId this users id to login
   */
  private async _login(userId: string) {
    const tokenData = this.tokenRepo.create({
      user: {
        id: userId,
      },
    });

    await this.invalidateTokens(tokenData.user.id);
    await this.tokenRepo.save(tokenData);

    const token = this.jwtService.sign({
      id: tokenData.id,
    });
    return token;
  }

  async login(data: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(data.email, true);
      const token = await this._login(user.id);
      return {
        token,
        user,
      };
    } catch (e) {
      throw new BadRequestException('User not found.');
    }
  }
}
