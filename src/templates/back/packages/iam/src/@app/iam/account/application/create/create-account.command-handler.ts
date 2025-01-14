/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccountCommand } from './create-account.command';
import { CreateAccountService } from './create-account.service';
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

@CommandHandler(CreateAccountCommand)
export class CreateAccountCommandHandler implements ICommandHandler<CreateAccountCommand>
{
    constructor(
        private readonly createAccountService: CreateAccountService,
    ) {}

    async execute(command: CreateAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccountService.main(
            {
                id: new AccountId(command.payload.id),
                type: new AccountType(command.payload.type),
                code: new AccountCode(command.payload.code),
                email: new AccountEmail(command.payload.email),
                isActive: new AccountIsActive(command.payload.isActive),
                clientId: new AccountClientId(command.payload.clientId),
                scopes: new AccountScopes(command.payload.scopes),
                dApplicationCodes: new AccountDApplicationCodes(command.payload.dApplicationCodes),
                dPermissions: new AccountDPermissions(command.payload.dPermissions, { default: {}}),
                dTenants: new AccountDTenants(command.payload.tenantIds, { default: []}),
                meta: new AccountMeta(command.payload.meta),
                roleIds: new AccountRoleIds(command.payload.roleIds),
                tenantIds: new AccountTenantIds(command.payload.tenantIds),
            },
            command.cQMetadata,
        );
    }
}