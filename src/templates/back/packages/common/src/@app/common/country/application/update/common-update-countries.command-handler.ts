/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateCountriesCommand } from './common-update-countries.command';
import { CommonUpdateCountriesService } from './common-update-countries.service';
import {
    CommonCountryId,
    CommonCountryIso3166Alpha2,
    CommonCountryIso3166Alpha3,
    CommonCountryIso3166Numeric,
    CommonCountryCustomCode,
    CommonCountryPrefix,
    CommonCountryImage,
    CommonCountrySort,
    CommonCountryAdministrativeAreas,
    CommonCountryLatitude,
    CommonCountryLongitude,
    CommonCountryZoom,
    CommonCountryMapType,
    CommonCountryAvailableLangs,
    CommonCountryCreatedAt,
    CommonCountryUpdatedAt,
    CommonCountryDeletedAt,
    CommonCountryI18nLangId,
    CommonCountryI18nName,
    CommonCountryI18nSlug,
    CommonCountryI18nAdministrativeAreaLevel1,
    CommonCountryI18nAdministrativeAreaLevel2,
    CommonCountryI18nAdministrativeAreaLevel3,
} from '../../domain/value-objects';

@CommandHandler(CommonUpdateCountriesCommand)
export class CommonUpdateCountriesCommandHandler implements ICommandHandler<CommonUpdateCountriesCommand>
{
    constructor(
        private readonly updateCountriesService: CommonUpdateCountriesService,
    ) {}

    async execute(command: CommonUpdateCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCountriesService.main(
            {
                id: new CommonCountryId(command.payload.id, { undefinable: true }),
                iso3166Alpha2: new CommonCountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CommonCountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CommonCountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CommonCountryCustomCode(command.payload.customCode),
                prefix: new CommonCountryPrefix(command.payload.prefix),
                image: new CommonCountryImage(command.payload.image),
                sort: new CommonCountrySort(command.payload.sort),
                administrativeAreas: new CommonCountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CommonCountryLatitude(command.payload.latitude),
                longitude: new CommonCountryLongitude(command.payload.longitude),
                zoom: new CommonCountryZoom(command.payload.zoom),
                mapType: new CommonCountryMapType(command.payload.mapType, { undefinable: true }),
                langId: new CommonCountryI18nLangId(command.payload.langId, { undefinable: true }),
                name: new CommonCountryI18nName(command.payload.name, { undefinable: true }),
                slug: new CommonCountryI18nSlug(command.payload.slug, { undefinable: true }),
                administrativeAreaLevel1: new CommonCountryI18nAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CommonCountryI18nAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CommonCountryI18nAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}