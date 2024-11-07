import { AuthDto } from './dto/auth.dto';
import { UsersRepositery } from './user.repositery';
export declare class AuthService {
    private usersRepositery;
    constructor(usersRepositery: UsersRepositery);
    signup(authDto: AuthDto): Promise<void>;
    signin(authDto: AuthDto): Promise<string>;
}
