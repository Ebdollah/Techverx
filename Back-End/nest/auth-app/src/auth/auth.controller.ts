import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateAuthDto } from './dto/auth.dto';
import { create } from 'domain';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('signup')
    signup(@Body() createAuthDto:CreateAuthDto){
        return this.authService.signup(createAuthDto)
    }

    @Post('login')
    login(@Body() createAuthDto:CreateAuthDto){
        return this.authService.login(createAuthDto)
    }

}
