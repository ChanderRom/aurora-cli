/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthFindRefreshTokenByIdHandler } from './o-auth-find-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.data';

describe('OAuthFindRefreshTokenByIdHandler', () =>
{
    let handler: OAuthFindRefreshTokenByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindRefreshTokenByIdHandler,
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

        handler = module.get<OAuthFindRefreshTokenByIdHandler>(OAuthFindRefreshTokenByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthFindRefreshTokenByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an refreshToken by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await handler.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});