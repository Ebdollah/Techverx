import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private authRepositery: Repository<Auth>,
    ){}

    async signup(createAuthDto: CreateAuthDto){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createAuthDto.password, salt)
        
        const newPerson = this.authRepositery.create({...createAuthDto, password: hashedPassword })
        return this.authRepositery.save(newPerson)
    }

    async login(createAuthDto: CreateAuthDto){
        const getUser = await this.authRepositery.findOne({
            where: {email: createAuthDto.email}
        })

        if (getUser && await bcrypt.compare(createAuthDto.password, getUser.password))
            return getUser

        throw new Error("Invalid")
    }
}
