import { CommonAdministrativeAreaLevel3Dto, CommonCreateAdministrativeAreaLevel3Dto } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3, CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { CommonCreateAdministrativeAreaLevel3Command, CommonFindAdministrativeAreaLevel3ByIdQuery } from '@app/common/administrative-area-level-3';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateAdministrativeAreaLevel3Handler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCreateAdministrativeAreaLevel3Input | CommonCreateAdministrativeAreaLevel3Dto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreaLevel3Command(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new CommonFindAdministrativeAreaLevel3ByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}