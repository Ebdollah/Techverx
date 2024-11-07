import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(authDto: AuthDto): Promise<void>;
    signin(authDto: AuthDto): Promise<string>;
}
