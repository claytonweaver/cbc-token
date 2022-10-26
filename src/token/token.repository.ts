import { AttributeMap, DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from 'aws-sdk';
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateTokenRequest } from "src/models/token-request";

export class TokenRepository {
    private tableName: string;
    private db: DocumentClient;

    constructor() {
        this.tableName = 'TokenTable';
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    public async getToken(tokenKey: string) {
        let tokenValue = '';

        try {
            const request: DocumentClient.GetItemInput = {
                TableName: this.tableName,
                Key: {
                    PK: tokenKey
                },
            };

            const result = await this.db.get(request).promise();

            if (result.Item) {
                tokenValue = result.Item['TokenValue']['S'];
            }

        } catch (error) {
            throw new InternalServerErrorException(error, 'Error trying to ' +
                `connect to table with aws dynamo db client ${this.tableName}` +
                `with token key ${tokenKey}`
            );
        }

        if (!tokenValue) {
            throw new NotFoundException(`Token value not found for token key ${tokenKey}`)
        }

        return tokenValue;
    }

    public async saveToken(tokenCreateRequest: CreateTokenRequest) {
        const tokenKey = process.env['TOKEN_KEY'];
        console.log(tokenKey);
    }
}