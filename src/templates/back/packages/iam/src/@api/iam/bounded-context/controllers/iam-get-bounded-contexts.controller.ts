/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamBoundedContextDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/get')
@Auth('iam.boundedContext.get')
export class IamGetBoundedContextsController
{
    constructor(
        private readonly handler: IamGetBoundedContextsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get bounded-contexts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [IamBoundedContextDto]})
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