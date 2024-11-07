import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { error } from "console";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersRepositery extends Repository<User>{
    constructor(private dataSource:DataSource){
        super(User, dataSource.createEntityManager())
    }

    async createUser(authDto: AuthDto):Promise<void>{
        const {username, email, password} = authDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        

        const user = this.create({username, email, password:hashedPassword})
        try{
            await this.save(user)
        }catch(error){
            if(error.code === 23505){
                throw new ConflictException("Username already exist")
            }
            else{
                throw new InternalServerErrorException();
            }
            console.log(error)
        }
    }


}
