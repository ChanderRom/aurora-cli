import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class DeletePermissionRoleByIdCommand
{
    constructor(
        public readonly payload: {
            permissionId: string;
            roleId: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}