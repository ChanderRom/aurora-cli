import { Injectable } from '@nestjs/common';
import { AuditingMeta, AddI18nConstraintService, CoreSearchKeyLang, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetCountriesQuery } from '@app/common/country/application/get/get-countries.query';
import { UpdateCountriesCommand } from '@app/common/country/application/update/update-countries.command';
import { CommonCountry, CommonUpdateCountriesInput } from '@api/graphql';
import { CommonCountryDto, CommonUpdateCountriesDto } from '../dto';

@Injectable()
export class CommonUpdateCountriesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18nConstraintService: AddI18nConstraintService,
    ) {}

    async main(
        payload: CommonUpdateCountriesInput | CommonUpdateCountriesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonCountry | CommonCountryDto>
    {
        await this.commandBus.dispatch(new UpdateCountriesCommand(
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

        constraint = await this.addI18nConstraintService.main({}, 'countryI18n', payload.langId, { contentLanguageFormat: CoreSearchKeyLang.ID });
        return await this.queryBus.ask(new GetCountriesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}