import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTokenRequest } from 'src/models/token-request';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
    constructor(private tokenRepository: TokenRepository) { }

    public async getToken(tokenKey: string): Promise<string> {
        return await this.tokenRepository.getToken(tokenKey);
    }

    public async createToken(createRequest: CreateTokenRequest): Promise<void> {
        const existingToken = await this.getToken(createRequest.tokenKey);

        if (existingToken) {
            throw new ConflictException(`Token already exists for key ${createRequest.tokenKey}`);
        }

        return await this.tokenRepository.createToken(createRequest);
    }
}
