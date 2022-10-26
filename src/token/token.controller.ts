import { BadRequestException, Controller, Get, Logger, Req } from '@nestjs/common';
import { TokenService } from './token.service';
import { Headers } from '@nestjs/common';

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
}