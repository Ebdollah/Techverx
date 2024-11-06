import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NoterService } from './noter.service';
import { CreateNoterDto } from './dto/create-noter.dto';


@Controller('noter')
export class NoterController {
    constructor(private readonly noterService: NoterService){}

    @Post('create')
    create(@Body() createNoterDto:CreateNoterDto){
        return this.noterService.create(createNoterDto)
    }

    @Get('')
    findAll(@Body() createNoterDto:CreateNoterDto){
        return this.noterService.findAll();
    }
}
