/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonUpdateCountriesController } from './common-update-countries.controller';
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

describe('CommonUpdateCountriesController', () =>
{
    let controller: CommonUpdateCountriesController;
    let handler: CommonUpdateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonUpdateCountriesController,
            ],
            providers: [
                {
                    provide : CommonUpdateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateCountriesController>(CommonUpdateCountriesController);
        handler = module.get<CommonUpdateCountriesHandler>(CommonUpdateCountriesHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a countries updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0])).toBe(commonMockCountryData[0]);
        });
    });
});