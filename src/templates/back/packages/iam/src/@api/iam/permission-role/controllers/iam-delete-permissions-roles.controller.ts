/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';
import { IamDeletePermissionRoleDto, IamPermissionRoleDto } from '../dto';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeletePermissionsRolesHandler } from '../handlers/iam-delete-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/delete')
@Permissions('iam.role.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeletePermissionsRolesController
{
    constructor(
        private readonly handler: IamDeletePermissionsRolesHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete permissions roles in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [IamPermissionRoleDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('payload') payload?: IamDeletePermissionRoleDto[],
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}