/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateScopesHandler } from './o-auth-paginate-scopes.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';

describe('OAuthPaginateScopesHandler', () =>
{
    let handler: OAuthPaginateScopesHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateScopesHandler,
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

        handler = module.get<OAuthPaginateScopesHandler>(OAuthPaginateScopesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateScopesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateScopesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: scopes.length,
                count: scopes.length,
                rows : scopes,
            })));
            expect(await handler.main()).toEqual({
                total: scopes.length,
                count: scopes.length,
                rows : scopes,
            });
        });
    });
});