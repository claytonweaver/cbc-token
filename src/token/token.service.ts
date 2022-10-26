import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
    constructor(private tokenRepository: TokenRepository) { }

    public async getToken(tokenKey: string) {
        return await this.tokenRepository.getToken(tokenKey);
    }
}
