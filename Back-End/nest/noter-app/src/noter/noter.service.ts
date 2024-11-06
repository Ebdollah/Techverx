import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Noter } from './noter.entity';
import { Repository } from 'typeorm';
import { CreateNoterDto } from './dto/create-noter.dto';

@Injectable()
export class NoterService {
    constructor(
        @InjectRepository(Noter)
        private noterRepositery: Repository<Noter>,
    ){}

    create(createNoterDto: CreateNoterDto){
        const newNoter = this.noterRepositery.create(createNoterDto);
        return this.noterRepositery.save(newNoter)
    }

    findAll(){
        return this.noterRepositery.find();
    }
}
