import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IPermissionRepository } from '@app/iam/permission/domain/permission.repository';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from '@app/iam/permission/domain/value-objects';
import { IamPermission } from '../../domain/permission.aggregate';
import { permissions } from './mock-permission.data';

@Injectable()
export class MockPermissionRepository extends MockRepository<IamPermission> implements IPermissionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamPermission';
    public collectionSource: IamPermission[];
    public deletedAtInstance: PermissionDeletedAt = new PermissionDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>permissions)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamPermission.register(
                new PermissionId(itemCollection.id),
                new PermissionName(itemCollection.name),
                new PermissionBoundedContextId(itemCollection.boundedContextId),
                new PermissionRoleIds(itemCollection.roleIds),
                new PermissionCreatedAt(itemCollection.createdAt),
                new PermissionUpdatedAt(itemCollection.updatedAt),
                new PermissionDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}