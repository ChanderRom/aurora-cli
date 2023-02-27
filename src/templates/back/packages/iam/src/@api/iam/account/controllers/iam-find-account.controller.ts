/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { IamAccountDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/find')
@Auth('iam.account.get')
export class IamFindAccountController
{
    constructor(
        private readonly handler: IamFindAccountHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamAccountDto })
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