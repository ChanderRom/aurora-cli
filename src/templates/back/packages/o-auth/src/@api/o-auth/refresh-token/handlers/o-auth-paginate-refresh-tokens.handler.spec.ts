/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthPaginateRefreshTokensHandler } from './o-auth-paginate-refresh-tokens.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.data';

describe('OAuthPaginateRefreshTokensHandler', () =>
{
    let handler: OAuthPaginateRefreshTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateRefreshTokensHandler,
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

        handler = module.get<OAuthPaginateRefreshTokensHandler>(OAuthPaginateRefreshTokensHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateRefreshTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: refreshTokens.length,
                count: refreshTokens.length,
                rows : refreshTokens,
            })));
            expect(await handler.main()).toEqual({
                total: refreshTokens.length,
                count: refreshTokens.length,
                rows : refreshTokens,
            });
        });
    });
});