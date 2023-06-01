import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '../../domain/value-objects';
import { IamRole } from '../../domain/role.aggregate';
import { roles } from './mock-role.data';
import * as _ from 'lodash';

@Injectable()
export class MockRoleSeeder extends MockSeeder<IamRole>
{
    public collectionSource: IamRole[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const role of _.orderBy(roles, ['id']))
        {
            this.collectionSource.push(
                IamRole.register(
                    new RoleId(role.id),
                    new RoleName(role.name),
                    new RoleIsMaster(role.isMaster),
                    new RolePermissionIds(role.permissions.map(permission => permission.id)),
                    // add permissions on administrator account
                    new RoleAccountIds(['948a5308-a49d-42dc-9ea3-7490e120000b']),
                    new RoleCreatedAt({ currentTimestamp: true }),
                    new RoleUpdatedAt({ currentTimestamp: true }),
                    new RoleDeletedAt(null),
                ),
            );
        }
    }
}