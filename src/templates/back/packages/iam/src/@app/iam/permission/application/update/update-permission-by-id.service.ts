import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '../../domain/value-objects';
import { IPermissionRepository } from '../../domain/permission.repository';
import { IamPermission } from '../../domain/permission.aggregate';

@Injectable()
export class UpdatePermissionByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRepository,
    ) {}

    async main(
        payload: {
            id: PermissionId;
            name?: PermissionName;
            boundedContextId?: PermissionBoundedContextId;
            roleIds?: PermissionRoleIds;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const permission = IamPermission.register(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            null, // createdAt
            new PermissionUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(permission, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const permissionRegister = this.publisher.mergeObjectContext(
            permission,
        );

        permissionRegister.updated(permission); // apply event to model events
        permissionRegister.commit(); // commit all events of model
    }
}