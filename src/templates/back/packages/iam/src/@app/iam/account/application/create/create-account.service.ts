import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';
import {
    AccountClientId,
    AccountCode,
    AccountCreatedAt,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountDeletedAt,
    AccountEmail,
    AccountId,
    AccountIsActive,
    AccountMeta,
    AccountRoleIds,
    AccountScopes,
    AccountTenantIds,
    AccountType,
    AccountUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreateAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository,
    ) {}

    async main(
        payload: {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const account = IamAccount.register(
            payload.id,
            payload.type,
            payload.code,
            payload.email,
            payload.isActive,
            payload.clientId,
            payload.scopes,
            payload.dApplicationCodes,
            payload.dPermissions,
            payload.dTenants,
            payload.meta,
            payload.roleIds,
            payload.tenantIds,
            new AccountCreatedAt({ currentTimestamp: true }),
            new AccountUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(account, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account,
        );

        accountRegister.created(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}