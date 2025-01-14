import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetTenantsQuery } from '@app/iam/tenant/application/get/get-tenants.query';
import { UpdateTenantsCommand } from '@app/iam/tenant/application/update/update-tenants.command';
import { IamTenant, IamUpdateTenantsInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantsDto } from '../dto';

@Injectable()
export class IamUpdateTenantsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantsInput | IamUpdateTenantsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new UpdateTenantsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new GetTenantsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}