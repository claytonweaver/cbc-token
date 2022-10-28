import { InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { CreateTokenRequest } from "src/models/token-request";
export class TokenRepository {
    private tableName: string;
    private db: any;
    constructor() {
        this.tableName = 'TokenTable'
        var AWS = require('aws-sdk');
        AWS.config.update({ region: 'us-east-2' });
        this.db = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
    }

    public async getToken(tokenKey: string): Promise<string> {
        let tokenValue = '';

        try {
            var params = {
                Key: {
                    "TokenKey": { "S": "test" }
                },
                TableName: "TokenTable"
            };

            const result = await this.db.getItem(params).promise();

            /* if (result.Item) {
                tokenValue = result.Item['TokenValue']['S'] ?? '';
            } */

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

    public async createToken(createRequest: CreateTokenRequest): Promise<void> {
        try {
            /* const tokenValue = process.env['TOKEN_KEY'];
            const itemPutRequest: DocumentClient.PutItemInput = {
                TableName: this.tableName,
                Item: {
                    'TokenKey': { S: createRequest.tokenKey },
                    'TokenValue': { S: tokenValue }
                }
            };

            await this.db.put(itemPutRequest).promise(); */

        } catch (error) {
            throw new InternalServerErrorException(error, 'Error trying to ' +
                `write token to dynamo db for table ${this.tableName}` +
                `with token key ${createRequest.tokenKey}`
            );
        }
    }
}