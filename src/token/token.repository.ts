export class TokenRepository {
    public async getToken(tokenKey: string) {
        return `token key ${tokenKey}, it works!`;
    }
}