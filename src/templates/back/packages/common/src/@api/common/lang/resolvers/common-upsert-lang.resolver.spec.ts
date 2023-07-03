/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertLangResolver } from './common-upsert-lang.resolver';
import { CommonUpsertLangHandler } from '../handlers/common-upsert-lang.handler';
import { CommonUpdateLangByIdInput } from '@api/graphql';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonUpsertLangResolver', () =>
{
    let resolver: CommonUpsertLangResolver;
    let handler: CommonUpsertLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertLangResolver,
                {
                    provide : CommonUpsertLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertLangResolver>(CommonUpsertLangResolver);
        handler = module.get<CommonUpsertLangHandler>(CommonUpsertLangHandler);
    });

    test('CommonUpsertLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await resolver.main(<CommonUpdateLangByIdInput>commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});