import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller()
export class AuthController{
    constructor(private authService: AuthService){}


    @Post('signup')
    signup(){
        this.authService.signup()
    }

    @Post('signin')
    signin(){
        this.authService.signin()
    }
} 