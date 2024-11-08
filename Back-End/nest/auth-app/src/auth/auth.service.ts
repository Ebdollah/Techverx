import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepositery } from './user.repositery';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UsersRepositery)
        private usersRepositery: UsersRepositery,
        private jwtService: JwtService
    ){}

    async signup(authDto: AuthDto): Promise<void>{
        return this.usersRepositery.createUser(authDto)
    }

    async signin(authDto: AuthDto): Promise<{accessToken: string}>{
        const {username, email, password} = authDto;
        const user = await this.usersRepositery.findOne({where:{username}})
        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = {username}
            const accessToken: string = await this.jwtService.sign(payload)
            return {accessToken}
        }
    }
}

// export class AuthService {
//     constructor(
//         @InjectRepository(Auth)
//         private authRepositery: Repository<Auth>,
//     ){}

//     async signup(createAuthDto: CreateAuthDto){
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(createAuthDto.password, salt)
        
//         const newPerson = this.authRepositery.create({...createAuthDto, password: hashedPassword })
//         return this.authRepositery.save(newPerson)
//     }

//     async login(createAuthDto: CreateAuthDto){
//         const getUser = await this.authRepositery.findOne({
//             where: {email: createAuthDto.email}
//         })

//         if (getUser && await bcrypt.compare(createAuthDto.password, getUser.password))
//             return getUser

//         throw new Error("Invalid")
//     }
// }
