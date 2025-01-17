import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantMeta,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';
import { IamTenant } from '../../domain/tenant.aggregate';
import { tenants } from './mock-tenant.data';
import * as _ from 'lodash';

@Injectable()
export class MockTenantSeeder extends MockSeeder<IamTenant>
{
    public collectionSource: IamTenant[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const tenant of _.orderBy(tenants, ['id']))
        {
            this.collectionSource.push(
                IamTenant.register(
                    new TenantId(tenant.id),
                    new TenantName(tenant.name),
                    new TenantCode(tenant.code),
                    new TenantLogo(tenant.logo),
                    new TenantIsActive(tenant.isActive),
                    new TenantMeta(tenant.meta),
                    new TenantAccountIds(tenant.accountIds),
                    new TenantCreatedAt({ currentTimestamp: true }),
                    new TenantUpdatedAt({ currentTimestamp: true }),
                    new TenantDeletedAt(null),
                ),
            );
        }
    }
}