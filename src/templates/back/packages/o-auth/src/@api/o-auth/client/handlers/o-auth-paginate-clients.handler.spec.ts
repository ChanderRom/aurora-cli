/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateClientsHandler } from './o-auth-paginate-clients.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

describe('OAuthPaginateClientsHandler', () =>
{
    let handler: OAuthPaginateClientsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateClientsHandler,
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

        handler = module.get<OAuthPaginateClientsHandler>(OAuthPaginateClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: clients.length,
                count: clients.length,
                rows : clients,
            })));
            expect(await handler.main()).toEqual({
                total: clients.length,
                count: clients.length,
                rows : clients,
            });
        });
    });
});