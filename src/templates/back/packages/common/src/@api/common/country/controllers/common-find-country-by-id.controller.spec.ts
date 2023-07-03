/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonFindCountryByIdController } from './common-find-country-by-id.controller';
import { CommonFindCountryByIdHandler } from '../handlers/common-find-country-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

describe('CommonFindCountryByIdController', () =>
{
    let controller: CommonFindCountryByIdController;
    let handler: CommonFindCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonFindCountryByIdController,
            ],
            providers: [
                {
                    provide : CommonFindCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindCountryByIdController>(CommonFindCountryByIdController);
        handler = module.get<CommonFindCountryByIdHandler>(CommonFindCountryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindCountryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0].id)).toBe(commonMockCountryData[0]);
        });
    });
});