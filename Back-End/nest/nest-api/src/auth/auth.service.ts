import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService{
    signin(){
        return {msg: 'signedin'}
    }
    signup(){
        return {msg: 'signedup'}
    }
}