/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamAccountDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetAccountsHandler } from '../handlers/iam-get-accounts.handler';

@ApiTags('[iam] account')
@Controller('iam/accounts/get')
@Auth('iam.account.get')
export class IamGetAccountsController
{
    constructor(
        private readonly handler: IamGetAccountsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get accounts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamAccountDto]})
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