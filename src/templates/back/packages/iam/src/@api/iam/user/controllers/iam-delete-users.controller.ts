/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamUserDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';

@ApiTags('[iam] user')
@Controller('iam/users/delete')
@Permissions('iam.user.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteUsersController
{
    constructor(
        private readonly handler: IamDeleteUsersHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete users in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamUserDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}