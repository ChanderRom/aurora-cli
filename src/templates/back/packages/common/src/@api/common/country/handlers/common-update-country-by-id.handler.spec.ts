/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateCountryByIdHandler } from '@api/common/country';
import { CommonUpdateCountryByIdInput } from '@api/graphql';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import { CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetSearchKeyLangService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateCountryByIdHandler', () =>
{
    let handler: CommonUpdateCountryByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpdateCountryByIdHandler,
                CoreAddI18nConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/langs' ? commonMockLangData : null,
                    },
                },
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
                {
                    provide : CoreGetContentLanguageObjectService,
                    useValue: {
                        get: () => ({
                            id        : '7c4754e7-3363-48ca-af99-632522226b51',
                            name      : 'English',
                            image     : 'us',
                            iso6392   : 'en',
                            iso6393   : 'eng',
                            ietf      : 'en-US',
                            customCode: null,
                            dir       : 'RTL',
                            sort      : 0,
                            isActive  : true,
                        }),
                    },
                },
                {
                    provide : CoreGetSearchKeyLangService,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonUpdateCountryByIdHandler>(CommonUpdateCountryByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonUpdateCountryByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateCountryByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a country updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(
                await handler.main(
                    <CommonUpdateCountryByIdInput>commonMockCountryData[0],
                    {},
                    'Europe/Madrid',
                    'en',
                ))
                .toBe(commonMockCountryData[0]);
        });
    });
});
