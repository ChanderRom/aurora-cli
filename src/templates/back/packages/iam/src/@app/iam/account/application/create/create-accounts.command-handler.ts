/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountsCommand } from './create-accounts.command';
import { CreateAccountsService } from './create-accounts.service';
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
} from '../../domain/value-objects';

@CommandHandler(CreateAccountsCommand)
export class CreateAccountsCommandHandler implements ICommandHandler<CreateAccountsCommand>
{
    constructor(
        private readonly createAccountsService: CreateAccountsService,
    ) {}

    async execute(command: CreateAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountsService.main(
            command.payload
                .map(account =>
                {
                    return {
                        id: new AccountId(account.id),
                        type: new AccountType(account.type),
                        code: new AccountCode(account.code),
                        email: new AccountEmail(account.email),
                        isActive: new AccountIsActive(account.isActive),
                        clientId: new AccountClientId(account.clientId),
                        scopes: new AccountScopes(account.scopes),
                        dApplicationCodes: new AccountDApplicationCodes(account.dApplicationCodes),
                        dPermissions: new AccountDPermissions(account.dPermissions),
                        dTenants: new AccountDTenants(account.dTenants),
                        meta: new AccountMeta(account.meta),
                        roleIds: new AccountRoleIds(account.roleIds),
                        tenantIds: new AccountTenantIds(account.tenantIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}