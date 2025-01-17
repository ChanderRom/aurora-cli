import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindPermissionRoleByIdQuery } from '@app/iam/permission-role/application/find/find-permission-role-by-id.query';
import { CreatePermissionRoleCommand } from '@app/iam/permission-role/application/create/create-permission-role.command';
import { IamPermissionRole, IamCreatePermissionRoleInput } from '@api/graphql';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';

@Injectable()
export class IamCreatePermissionRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreatePermissionRoleInput | IamCreatePermissionRoleDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole | IamPermissionRoleDto>
    {
        await this.commandBus.dispatch(new CreatePermissionRoleCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindPermissionRoleByIdQuery(
            payload.permissionId,
            payload.roleId,
            {},
            { timezone },
        ));
    }
}