/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthUpdateClientsService } from './o-auth-update-clients.service';
import {
    OAuthClientId,
    OAuthClientGrantType,
    OAuthClientName,
    OAuthClientSecret,
    OAuthClientAuthUrl,
    OAuthClientRedirect,
    OAuthClientScopeOptions,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientApplicationIds,
    OAuthClientCreatedAt,
    OAuthClientUpdatedAt,
    OAuthClientDeletedAt,
} from '../../domain/value-objects';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthMockClientRepository } from '../../infrastructure/mock/o-auth-mock-client.repository';

describe('OAuthUpdateClientsService', () =>
{
    let service: OAuthUpdateClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateClientsService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateClientsService);
    });

    describe('main', () =>
    {
        test('UpdateClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a clients and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthClientId(oAuthMockClientData[0].id),
                        grantType: new OAuthClientGrantType(oAuthMockClientData[0].grantType),
                        name: new OAuthClientName(oAuthMockClientData[0].name),
                        secret: new OAuthClientSecret(oAuthMockClientData[0].secret),
                        authUrl: new OAuthClientAuthUrl(oAuthMockClientData[0].authUrl),
                        redirect: new OAuthClientRedirect(oAuthMockClientData[0].redirect),
                        scopeOptions: new OAuthClientScopeOptions(oAuthMockClientData[0].scopeOptions),
                        expiredAccessToken: new OAuthClientExpiredAccessToken(oAuthMockClientData[0].expiredAccessToken),
                        expiredRefreshToken: new OAuthClientExpiredRefreshToken(oAuthMockClientData[0].expiredRefreshToken),
                        isActive: new OAuthClientIsActive(oAuthMockClientData[0].isActive),
                        isMaster: new OAuthClientIsMaster(oAuthMockClientData[0].isMaster),
                        applicationIds: new OAuthClientApplicationIds(oAuthMockClientData[0].applicationIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
