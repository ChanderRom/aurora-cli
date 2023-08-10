import { QueueManagerJobRegistry } from '@api/graphql';
import { QueueManagerJobRegistryDto } from '@api/queue-manager/job-registry';
import { QueueManagerFindJobRegistryQuery } from '@app/queue-manager/job-registry';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagerFindJobRegistryHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<QueueManagerJobRegistry | QueueManagerJobRegistryDto>
    {
        return await this.queryBus.ask(new QueueManagerFindJobRegistryQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
