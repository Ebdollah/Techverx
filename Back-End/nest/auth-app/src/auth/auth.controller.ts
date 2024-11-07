import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { create } from 'domain';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('signup')
    signup(@Body() authDto:AuthDto){
        return this.authService.signup(authDto)
    }

    @Post('login')
    signin(@Body() authDto:AuthDto){
        return this.authService.signin(authDto)
    }

}
