import { AuthDto } from './dto/auth.dto';
import { UsersRepositery } from './user.repositery';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepositery;
    private jwtService;
    constructor(usersRepositery: UsersRepositery, jwtService: JwtService);
    signup(authDto: AuthDto): Promise<void>;
    signin(authDto: AuthDto): Promise<{
        accessToken: string;
    }>;
}
