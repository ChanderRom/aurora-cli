/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopesResolver } from './o-auth-update-scopes.resolver';
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';
import { OAuthUpdateScopesInput } from '@api/graphql';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/mock/mock-scope.data';

describe('OAuthUpdateScopesResolver', () =>
{
    let resolver: OAuthUpdateScopesResolver;
    let handler: OAuthUpdateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopesResolver,
                {
                    provide : OAuthUpdateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateScopesResolver>(OAuthUpdateScopesResolver);
        handler = module.get<OAuthUpdateScopesHandler>(OAuthUpdateScopesHandler);
    });

    test('OAuthUpdateScopesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scopes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(<OAuthUpdateScopesInput>scopes[0])).toBe(scopes[0]);
        });
    });
});