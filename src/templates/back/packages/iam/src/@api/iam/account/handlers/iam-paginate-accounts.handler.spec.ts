/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { IamPaginateAccountsHandler } from './iam-paginate-accounts.handler';

// sources
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';

describe('IamPaginateAccountsHandler', () =>
{
    let handler: IamPaginateAccountsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateAccountsHandler,
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

        handler = module.get<IamPaginateAccountsHandler>(IamPaginateAccountsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateAccountsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accounts', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: accounts.length,
                count: accounts.length,
                rows : accounts,
            })));
            expect(await handler.main()).toEqual({
                total: accounts.length,
                count: accounts.length,
                rows : accounts,
            });
        });
    });
});