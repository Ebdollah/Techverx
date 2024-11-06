import { Noter } from './noter.entity';
import { Repository } from 'typeorm';
import { CreateNoterDto } from './dto/create-noter.dto';
export declare class NoterService {
    private noterRepositery;
    constructor(noterRepositery: Repository<Noter>);
    create(createNoterDto: CreateNoterDto): Promise<Noter>;
    findAll(): Promise<Noter[]>;
}
