import { CreateAuthDto } from './dto/auth.dto';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private authRepositery;
    constructor(authRepositery: Repository<Auth>);
    signup(createAuthDto: CreateAuthDto): Promise<Auth>;
    login(createAuthDto: CreateAuthDto): Promise<Auth>;
}
