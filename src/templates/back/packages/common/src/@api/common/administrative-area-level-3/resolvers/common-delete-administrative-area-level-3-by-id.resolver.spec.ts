/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel3ByIdResolver } from './common-delete-administrative-area-level-3-by-id.resolver';
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-delete-administrative-area-level-3-by-id.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonDeleteAdministrativeAreaLevel3ByIdResolver', () =>
{
    let resolver: CommonDeleteAdministrativeAreaLevel3ByIdResolver;
    let handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreaLevel3ByIdResolver,
                {
                    provide : CommonDeleteAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAdministrativeAreaLevel3ByIdResolver>(CommonDeleteAdministrativeAreaLevel3ByIdResolver);
        handler = module.get<CommonDeleteAdministrativeAreaLevel3ByIdHandler>(CommonDeleteAdministrativeAreaLevel3ByIdHandler);
    });

    test('CommonDeleteAdministrativeAreaLevel3ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel3ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await resolver.main(commonMockAdministrativeAreaLevel3Data[0].id)).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});