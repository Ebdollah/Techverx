import { NoterService } from './noter.service';
import { CreateNoterDto } from './dto/create-noter.dto';
export declare class NoterController {
    private readonly noterService;
    constructor(noterService: NoterService);
    create(createNoterDto: CreateNoterDto): Promise<import("./noter.entity").Noter>;
    findAll(createNoterDto: CreateNoterDto): Promise<import("./noter.entity").Noter[]>;
}
