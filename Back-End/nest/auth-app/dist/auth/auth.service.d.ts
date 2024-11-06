import { Authent } from './auth.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private authRepositery;
    constructor(authRepositery: Repository<Authent>);
}
