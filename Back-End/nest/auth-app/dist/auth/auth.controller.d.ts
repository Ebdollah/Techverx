import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createAuthDto: CreateAuthDto): Promise<import("./auth.entity").Auth>;
    login(createAuthDto: CreateAuthDto): Promise<import("./auth.entity").Auth>;
}
