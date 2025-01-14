import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';
import { PermissionId } from '../../domain/value-objects';

@Injectable()
export class FindPermissionByIdService
{
    constructor(
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        id: PermissionId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermission>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}