import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Authent } from './auth.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Authent)
        private authRepositery: Repository<Authent>
    ){}

    signup(createAuthDto: CreateAuthDto){
        const newPerson = this.authRepositery.create(createAuthDto)
        return this.authRepositery.save(newPerson)
    }

    async login(createAuthDto: CreateAuthDto){
        const getUser = await this.authRepositery.findOne({
            where: {email: createAuthDto.email}
        })

        if (getUser && await createAuthDto.password === getUser.password)
            return getUser

        throw new Error("Invalid")
    }
}
