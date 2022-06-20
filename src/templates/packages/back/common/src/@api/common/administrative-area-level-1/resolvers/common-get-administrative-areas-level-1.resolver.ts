import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetAdministrativeAreasLevel1Query } from '../../../../@apps/common/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { CommonAdministrativeAreaLevel1 } from './../../../../graphql';

@Resolver()
export class CommonGetAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonGetAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));
    }
}