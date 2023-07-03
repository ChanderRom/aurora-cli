import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
import { CommonGetAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[] | CommonAdministrativeAreaLevel2Dto[]>
    {
        return await this.queryBus.ask(new CommonGetAdministrativeAreasLevel2Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}