/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { IamPermissionDto } from '../dto';
import { Auth } from '@aurora/decorators';

// @app
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';

@ApiTags('[iam] permission')
@Controller('iam/permissions/delete')
@Auth('iam.permission.delete')
export class IamDeletePermissionsController
{
    constructor(
        private readonly handler: IamDeletePermissionsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete permissions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamPermissionDto]})
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