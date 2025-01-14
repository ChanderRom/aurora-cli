/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthApplicationDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Auth('oAuth.application.get')
export class OAuthFindApplicationController
{
    constructor(
        private readonly handler: OAuthFindApplicationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: OAuthApplicationDto })
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