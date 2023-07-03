/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertAdministrativeAreaLevel2Resolver } from './common-upsert-administrative-area-level-2.resolver';
import { CommonUpsertAdministrativeAreaLevel2Handler } from '../handlers/common-upsert-administrative-area-level-2.handler';
import { CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';

describe('CommonUpsertAdministrativeAreaLevel2Resolver', () =>
{
    let resolver: CommonUpsertAdministrativeAreaLevel2Resolver;
    let handler: CommonUpsertAdministrativeAreaLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAdministrativeAreaLevel2Resolver,
                {
                    provide : CommonUpsertAdministrativeAreaLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertAdministrativeAreaLevel2Resolver>(CommonUpsertAdministrativeAreaLevel2Resolver);
        handler = module.get<CommonUpsertAdministrativeAreaLevel2Handler>(CommonUpsertAdministrativeAreaLevel2Handler);
    });

    test('CommonUpsertAdministrativeAreaLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel2ByIdInput>commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});