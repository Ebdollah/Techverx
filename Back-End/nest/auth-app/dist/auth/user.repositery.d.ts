import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";
export declare class UsersRepositery extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(authDto: AuthDto): Promise<void>;
}
