/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthClientDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/find')
@Auth('oAuth.client.get')
export class OAuthFindClientController
{
    constructor(
        private readonly handler: OAuthFindClientHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find client according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthClientDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}