/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { OAuthDeleteRefreshTokenByIdHandler } from './o-auth-delete-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.data';

describe('OAuthDeleteRefreshTokenByIdController', () =>
{
    let handler: OAuthDeleteRefreshTokenByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteRefreshTokenByIdHandler,
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

        handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(OAuthDeleteRefreshTokenByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokenByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an refreshToken deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await handler.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});