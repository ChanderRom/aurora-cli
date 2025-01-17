/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthDeleteClientsHandler } from './o-auth-delete-clients.handler';

// sources
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

describe('OAuthDeleteClientsHandler', () =>
{
    let handler: OAuthDeleteClientsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteClientsHandler,
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

        handler = module.get<OAuthDeleteClientsHandler>(OAuthDeleteClientsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteClientsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an clients deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await handler.main()).toBe(clients);
        });
    });
});