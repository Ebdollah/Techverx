import { Strategy } from 'passport-jwt';
import { UsersRepositery } from './user.repositery';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepositery;
    constructor(userRepositery: UsersRepositery);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
