import { BadRequestException, Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { TokenService } from './token.service';
import { Headers } from '@nestjs/common';
import { CreateTokenRequest } from 'src/models/token-request';
import { validateAllKeysAreTruthy } from 'src/utils/utils';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) { }

    private TOKEN_KEY_HEADER: string = 'tokenKey';

    @Get()
    public async getToken(@Headers('tokenKey') tokenKey: string) {
        if (!tokenKey) {
            throw new BadRequestException(`Need to provide ${this.TOKEN_KEY_HEADER} in headers`);
        }

        return await this.tokenService.getToken(tokenKey);
    }

    @Post()
    public async createToken(@Body() createReq: CreateTokenRequest) {
        validateAllKeysAreTruthy(createReq, new BadRequestException());

        return await this.tokenService.createToken(createReq);
    }
}

