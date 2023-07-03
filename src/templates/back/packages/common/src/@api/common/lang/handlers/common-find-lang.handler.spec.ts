/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangHandler', () =>
{
    let handler: CommonFindLangHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindLangHandler,
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
            ],
        })
            .compile();

        handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonFindLangHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindLangHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a lang', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await handler.main()).toBe(commonMockLangData[0]);
        });
    });
});