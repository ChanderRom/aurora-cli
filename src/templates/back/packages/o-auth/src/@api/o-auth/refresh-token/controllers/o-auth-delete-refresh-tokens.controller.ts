/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { OAuthRefreshTokenDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteRefreshTokensHandler } from '../handlers/o-auth-delete-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/delete')
@Auth('oAuth.refreshToken.delete')
export class OAuthDeleteRefreshTokensController
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokensHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete refresh-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [OAuthRefreshTokenDto]})
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