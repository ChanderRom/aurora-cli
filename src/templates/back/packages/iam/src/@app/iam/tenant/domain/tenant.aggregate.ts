/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { CreatedTenantEvent } from '../application/events/created-tenant.event';
import { UpdatedTenantEvent } from '../application/events/updated-tenant.event';
import { DeletedTenantEvent } from '../application/events/deleted-tenant.event';
import { IamAccount } from '@app/iam/account/domain/account.aggregate';

export class IamTenant extends AggregateRoot
{
    id: TenantId;
    name: TenantName;
    code: TenantCode;
    logo: TenantLogo;
    isActive: TenantIsActive;
    meta: TenantMeta;
    accountIds: TenantAccountIds;
    createdAt: TenantCreatedAt;
    updatedAt: TenantUpdatedAt;
    deletedAt: TenantDeletedAt;

    // eager relationship
    accounts: IamAccount[];

    constructor(
        id: TenantId,
        name: TenantName,
        code: TenantCode,
        logo: TenantLogo,
        isActive: TenantIsActive,
        meta: TenantMeta,
        accountIds: TenantAccountIds,
        createdAt: TenantCreatedAt,
        updatedAt: TenantUpdatedAt,
        deletedAt: TenantDeletedAt,

        accounts?: IamAccount[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.logo = logo;
        this.isActive = isActive;
        this.meta = meta;
        this.accountIds = accountIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.accounts = accounts;
    }

    static register (
        id: TenantId,
        name: TenantName,
        code: TenantCode,
        logo: TenantLogo,
        isActive: TenantIsActive,
        meta: TenantMeta,
        accountIds: TenantAccountIds,
        createdAt: TenantCreatedAt,
        updatedAt: TenantUpdatedAt,
        deletedAt: TenantDeletedAt,

        accounts?: IamAccount[],
    ): IamTenant
    {
        return new IamTenant(
            id,
            name,
            code,
            logo,
            isActive,
            meta,
            accountIds,
            createdAt,
            updatedAt,
            deletedAt,

            accounts,
        );
    }

    created(tenant: IamTenant): void
    {
        this.apply(
            new CreatedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    updated(tenant: IamTenant): void
    {
        this.apply(
            new UpdatedTenantEvent(
                tenant.id?.value,
                tenant.name?.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive?.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    deleted(tenant: IamTenant): void
    {
        this.apply(
            new DeletedTenantEvent(
                tenant.id.value,
                tenant.name.value,
                tenant.code?.value,
                tenant.logo?.value,
                tenant.isActive.value,
                tenant.meta?.value,
                tenant.accountIds?.value,
                tenant.createdAt?.value,
                tenant.updatedAt?.value,
                tenant.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.value,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accounts: this.accounts?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code?.value,
            logo: this.logo?.buffer,
            isActive: this.isActive.value,
            meta: this.meta?.value,
            accountIds: this.accountIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accounts: this.accounts?.map(item => item.toDTO()),
        };
    }
}
