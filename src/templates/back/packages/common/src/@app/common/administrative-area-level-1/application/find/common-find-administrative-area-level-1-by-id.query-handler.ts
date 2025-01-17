import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonAdministrativeAreaLevel1Response } from '../../domain/common-administrative-area-level-1.response';
import { CommonAdministrativeAreaLevel1Mapper } from '../../domain/common-administrative-area-level-1.mapper';
import { CommonAdministrativeAreaLevel1Id } from '../../domain/value-objects';
import { CommonFindAdministrativeAreaLevel1ByIdQuery } from './common-find-administrative-area-level-1-by-id.query';
import { CommonFindAdministrativeAreaLevel1ByIdService } from './common-find-administrative-area-level-1-by-id.service';

@QueryHandler(CommonFindAdministrativeAreaLevel1ByIdQuery)
export class CommonFindAdministrativeAreaLevel1ByIdQueryHandler implements IQueryHandler<CommonFindAdministrativeAreaLevel1ByIdQuery>
{
    private readonly mapper: CommonAdministrativeAreaLevel1Mapper = new CommonAdministrativeAreaLevel1Mapper();

    constructor(
        private readonly findAdministrativeAreaLevel1ByIdService: CommonFindAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(query: CommonFindAdministrativeAreaLevel1ByIdQuery): Promise<CommonAdministrativeAreaLevel1Response>
    {
        const administrativeAreaLevel1 = await this.findAdministrativeAreaLevel1ByIdService.main(
            new CommonAdministrativeAreaLevel1Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(administrativeAreaLevel1);
    }
}