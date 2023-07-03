import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';

@Injectable()
export class CommonAdministrativeAreaLevel2Seeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAdministrativeAreasLevel2Command(
            commonMockAdministrativeAreaLevel2Data,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}