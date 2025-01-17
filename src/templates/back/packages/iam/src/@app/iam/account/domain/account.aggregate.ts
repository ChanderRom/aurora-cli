/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AccountId,
    AccountType,
    AccountCode,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountScopes,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountMeta,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from './value-objects';
import { CreatedAccountEvent } from '../application/events/created-account.event';
import { UpdatedAccountEvent } from '../application/events/updated-account.event';
import { DeletedAccountEvent } from '../application/events/deleted-account.event';
import { IamUser } from '@app/iam/user/domain/user.aggregate';
import { OAuthClient } from '@app/o-auth/client/domain/client.aggregate';
import { IamRole } from '@app/iam/role/domain/role.aggregate';
import { IamTenant } from '@app/iam/tenant/domain/tenant.aggregate';

export class IamAccount extends AggregateRoot
{
    id: AccountId;
    type: AccountType;
    code: AccountCode;
    email: AccountEmail;
    isActive: AccountIsActive;
    clientId: AccountClientId;
    scopes: AccountScopes;
    dApplicationCodes: AccountDApplicationCodes;
    dPermissions: AccountDPermissions;
    dTenants: AccountDTenants;
    meta: AccountMeta;
    roleIds: AccountRoleIds;
    tenantIds: AccountTenantIds;
    createdAt: AccountCreatedAt;
    updatedAt: AccountUpdatedAt;
    deletedAt: AccountDeletedAt;

    // eager relationship
    user: IamUser;
    client: OAuthClient;
    roles: IamRole[];
    tenants: IamTenant[];

    constructor(
        id: AccountId,
        type: AccountType,
        code: AccountCode,
        email: AccountEmail,
        isActive: AccountIsActive,
        clientId: AccountClientId,
        scopes: AccountScopes,
        dApplicationCodes: AccountDApplicationCodes,
        dPermissions: AccountDPermissions,
        dTenants: AccountDTenants,
        meta: AccountMeta,
        roleIds: AccountRoleIds,
        tenantIds: AccountTenantIds,
        createdAt: AccountCreatedAt,
        updatedAt: AccountUpdatedAt,
        deletedAt: AccountDeletedAt,

        user?: IamUser,
        client?: OAuthClient,
        roles?: IamRole[],
        tenants?: IamTenant[],
    )
    {
        super();
        this.id = id;
        this.type = type;
        this.code = code;
        this.email = email;
        this.isActive = isActive;
        this.clientId = clientId;
        this.scopes = scopes;
        this.dApplicationCodes = dApplicationCodes;
        this.dPermissions = dPermissions;
        this.dTenants = dTenants;
        this.meta = meta;
        this.roleIds = roleIds;
        this.tenantIds = tenantIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.user = user;
        this.client = client;
        this.roles = roles;
        this.tenants = tenants;
    }

    static register (
        id: AccountId,
        type: AccountType,
        code: AccountCode,
        email: AccountEmail,
        isActive: AccountIsActive,
        clientId: AccountClientId,
        scopes: AccountScopes,
        dApplicationCodes: AccountDApplicationCodes,
        dPermissions: AccountDPermissions,
        dTenants: AccountDTenants,
        meta: AccountMeta,
        roleIds: AccountRoleIds,
        tenantIds: AccountTenantIds,
        createdAt: AccountCreatedAt,
        updatedAt: AccountUpdatedAt,
        deletedAt: AccountDeletedAt,

        user?: IamUser,
        client?: OAuthClient,
        roles?: IamRole[],
        tenants?: IamTenant[],
    ): IamAccount
    {
        return new IamAccount(
            id,
            type,
            code,
            email,
            isActive,
            clientId,
            scopes,
            dApplicationCodes,
            dPermissions,
            dTenants,
            meta,
            roleIds,
            tenantIds,
            createdAt,
            updatedAt,
            deletedAt,

            user,
            client,
            roles,
            tenants,
        );
    }

    created(account: IamAccount): void
    {
        this.apply(
            new CreatedAccountEvent(
                account.id.value,
                account.type.value,
                account.code?.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.scopes?.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    updated(account: IamAccount): void
    {
        this.apply(
            new UpdatedAccountEvent(
                account.id?.value,
                account.type?.value,
                account.code?.value,
                account.email?.value,
                account.isActive?.value,
                account.clientId?.value,
                account.scopes?.value,
                account.dApplicationCodes?.value,
                account.dPermissions?.value,
                account.dTenants?.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    deleted(account: IamAccount): void
    {
        this.apply(
            new DeletedAccountEvent(
                account.id.value,
                account.type.value,
                account.code?.value,
                account.email.value,
                account.isActive.value,
                account.clientId.value,
                account.scopes?.value,
                account.dApplicationCodes.value,
                account.dPermissions.value,
                account.dTenants.value,
                account.meta?.value,
                account.roleIds?.value,
                account.tenantIds?.value,
                account.createdAt?.value,
                account.updatedAt?.value,
                account.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            type: this.type.value,
            code: this.code?.value,
            email: this.email.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            scopes: this.scopes?.value,
            dApplicationCodes: this.dApplicationCodes.value,
            dPermissions: this.dPermissions.value,
            dTenants: this.dTenants.value,
            meta: this.meta?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            user: this.user?.toDTO(),
            client: this.client?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            type: this.type.value,
            code: this.code?.value,
            email: this.email.value,
            isActive: this.isActive.value,
            clientId: this.clientId.value,
            scopes: this.scopes?.value,
            dApplicationCodes: this.dApplicationCodes.value,
            dPermissions: this.dPermissions.value,
            dTenants: this.dTenants.value,
            meta: this.meta?.value,
            roleIds: this.roleIds?.value,
            tenantIds: this.tenantIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            user: this.user?.toDTO(),
            client: this.client?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
            tenants: this.tenants?.map(item => item.toDTO()),
        };
    }
}
