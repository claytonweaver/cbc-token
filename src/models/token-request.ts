import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTokenRequest {
    @IsNotEmpty()
    tokenKey: string = '';
    @IsEmail()
    email: string = '';
    @IsNotEmpty()
    password: string = '';
}