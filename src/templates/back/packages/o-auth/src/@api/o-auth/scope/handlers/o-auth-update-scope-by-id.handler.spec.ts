/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthUpdateScopeByIdHandler } from './o-auth-update-scope-by-id.handler';
import { OAuthUpdateScopeByIdInput } from '@api/graphql';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';

describe('OAuthUpdateScopeByIdHandler', () =>
{
    let handler: OAuthUpdateScopeByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopeByIdHandler,
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

        handler     = module.get<OAuthUpdateScopeByIdHandler>(OAuthUpdateScopeByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateScopeByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a scope updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await handler.main(<OAuthUpdateScopeByIdInput>scopes[0])).toBe(scopes[0]);
        });
    });
});