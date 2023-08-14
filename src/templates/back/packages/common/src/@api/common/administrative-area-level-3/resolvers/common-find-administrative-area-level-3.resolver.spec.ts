/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAdministrativeAreaLevel3Handler, CommonFindAdministrativeAreaLevel3Resolver } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3Resolver', () =>
{
    let resolver: CommonFindAdministrativeAreaLevel3Resolver;
    let handler: CommonFindAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel3Resolver,
                {
                    provide : CommonFindAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindAdministrativeAreaLevel3Resolver>(CommonFindAdministrativeAreaLevel3Resolver);
        handler = module.get<CommonFindAdministrativeAreaLevel3Handler>(CommonFindAdministrativeAreaLevel3Handler);
    });

    test('CommonFindAdministrativeAreaLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel3', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await resolver.main()).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
