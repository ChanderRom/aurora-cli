import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateTenantsQuery } from '@app/iam/tenant/application/paginate/paginate-tenants.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class IamPaginateTenantsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateTenantsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}