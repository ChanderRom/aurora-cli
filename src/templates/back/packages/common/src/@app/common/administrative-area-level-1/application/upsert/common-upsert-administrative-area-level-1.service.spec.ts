/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonUpsertAdministrativeAreaLevel1Service } from './common-upsert-administrative-area-level-1.service';
import {
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1Zoom,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonMockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-1.repository';

describe('CommonUpsertAdministrativeAreaLevel1Service', () =>

{
    let service: CommonUpsertAdministrativeAreaLevel1Service;
    let repository: CommonIAdministrativeAreaLevel1Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpsertAdministrativeAreaLevel1Service,
                CommonMockAdministrativeAreaLevel1Repository,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpsertAdministrativeAreaLevel1Service);
        repository = module.get(CommonIAdministrativeAreaLevel1Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a administrativeAreaLevel1 and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new CommonAdministrativeAreaLevel1Id(commonMockAdministrativeAreaLevel1Data[0].id),
                    countryId: new CommonAdministrativeAreaLevel1CountryId(commonMockAdministrativeAreaLevel1Data[0].countryId),
                    code: new CommonAdministrativeAreaLevel1Code(commonMockAdministrativeAreaLevel1Data[0].code),
                    customCode: new CommonAdministrativeAreaLevel1CustomCode(commonMockAdministrativeAreaLevel1Data[0].customCode),
                    name: new CommonAdministrativeAreaLevel1Name(commonMockAdministrativeAreaLevel1Data[0].name),
                    slug: new CommonAdministrativeAreaLevel1Slug(commonMockAdministrativeAreaLevel1Data[0].slug),
                    latitude: new CommonAdministrativeAreaLevel1Latitude(commonMockAdministrativeAreaLevel1Data[0].latitude),
                    longitude: new CommonAdministrativeAreaLevel1Longitude(commonMockAdministrativeAreaLevel1Data[0].longitude),
                    zoom: new CommonAdministrativeAreaLevel1Zoom(commonMockAdministrativeAreaLevel1Data[0].zoom),
                    mapType: new CommonAdministrativeAreaLevel1MapType(commonMockAdministrativeAreaLevel1Data[0].mapType),
                },
            )).toBe(undefined);
        });
    });
});