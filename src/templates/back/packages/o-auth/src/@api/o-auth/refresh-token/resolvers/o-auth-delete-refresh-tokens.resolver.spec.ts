/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokensResolver } from './o-auth-delete-refresh-tokens.resolver';
import { OAuthDeleteRefreshTokensHandler } from '../handlers/o-auth-delete-refresh-tokens.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.data';

describe('OAuthDeleteRefreshTokensResolver', () =>
{
    let resolver: OAuthDeleteRefreshTokensResolver;
    let handler: OAuthDeleteRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteRefreshTokensResolver,
                {
                    provide : OAuthDeleteRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteRefreshTokensResolver>(OAuthDeleteRefreshTokensResolver);
        handler = module.get<OAuthDeleteRefreshTokensHandler>(OAuthDeleteRefreshTokensHandler);
    });

    test('OAuthDeleteRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshTokens deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await resolver.main()).toBe(refreshTokens);
        });
    });
});