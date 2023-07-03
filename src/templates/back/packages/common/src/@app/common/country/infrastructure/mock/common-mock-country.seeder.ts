import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
import { CommonCountry } from '../../domain/common-country.aggregate';
import { commonMockCountryData } from './common-mock-country.data';
import * as _ from 'lodash';

@Injectable()
export class CommonMockCountrySeeder extends MockSeeder<CommonCountry>
{
    public collectionSource: CommonCountry[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const country of _.orderBy(commonMockCountryData, ['id']))
        {
            this.collectionSource.push(
                CommonCountry.register(
                    new CommonCountryId(country.id),
                    new CommonCountryIso3166Alpha2(country.iso3166Alpha2),
                    new CommonCountryIso3166Alpha3(country.iso3166Alpha3),
                    new CommonCountryIso3166Numeric(country.iso3166Numeric),
                    new CommonCountryCustomCode(country.customCode),
                    new CommonCountryPrefix(country.prefix),
                    new CommonCountryImage(country.image),
                    new CommonCountrySort(country.sort),
                    new CommonCountryAdministrativeAreas(country.administrativeAreas),
                    new CommonCountryLatitude(country.latitude),
                    new CommonCountryLongitude(country.longitude),
                    new CommonCountryZoom(country.zoom),
                    new CommonCountryMapType(country.mapType),
                    new CommonCountryAvailableLangs(country.availableLangs),
                    new CommonCountryCreatedAt({ currentTimestamp: true }),
                    new CommonCountryUpdatedAt({ currentTimestamp: true }),
                    new CommonCountryDeletedAt(null),
                    new CommonCountryI18nLangId(country.langId),
                    new CommonCountryI18nName(country.name),
                    new CommonCountryI18nSlug(country.slug),
                    new CommonCountryI18nAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                    new CommonCountryI18nAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                    new CommonCountryI18nAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                ),
            );
        }
    }
}