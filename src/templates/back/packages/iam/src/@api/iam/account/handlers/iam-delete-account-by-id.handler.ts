import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { DeleteAccountByIdCommand } from '@app/iam/account/application/delete/delete-account-by-id.command';
import { IamAccount } from '@api/graphql';
import { IamAccountDto } from '../dto';

@Injectable()
export class IamDeleteAccountByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount | IamAccountDto>
    {
        const account = await this.queryBus.ask(new FindAccountByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return account;
    }
}