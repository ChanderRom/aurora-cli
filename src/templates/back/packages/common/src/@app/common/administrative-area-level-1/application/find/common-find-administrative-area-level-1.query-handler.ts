import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel1Response } from '../../domain/common-administrative-area-level-1.response';
import { CommonAdministrativeAreaLevel1Mapper } from '../../domain/common-administrative-area-level-1.mapper';
import { CommonFindAdministrativeAreaLevel1Query } from './common-find-administrative-area-level-1.query';
import { CommonFindAdministrativeAreaLevel1Service } from './common-find-administrative-area-level-1.service';

@QueryHandler(CommonFindAdministrativeAreaLevel1Query)
export class CommonFindAdministrativeAreaLevel1QueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel1Query>
{
    private readonly mapper: CommonAdministrativeAreaLevel1Mapper = new CommonAdministrativeAreaLevel1Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel1Service: CommonFindAdministrativeAreaLevel1Service,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel1Query): Promise<CommonAdministrativeAreaLevel1Response>
    {
        const administrativeAreaLevel1 = await this.findAdministrativeAreaLevel1Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
    }
}