


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepositery } from './user.repositery';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UsersRepositery)
    private userRepositery: UsersRepositery
   ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'string',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const {username} = payload;
    const user: User = await this.userRepositery.findOne({where:{username}})

    if(!user){
        throw new UnauthorizedException();
    }
    return user;
  }
}
