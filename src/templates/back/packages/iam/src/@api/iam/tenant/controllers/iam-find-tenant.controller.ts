/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamTenantDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
@Auth('iam.tenant.get')
export class IamFindTenantController
{
    constructor(
        private readonly handler: IamFindTenantHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tenant according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: IamTenantDto })
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