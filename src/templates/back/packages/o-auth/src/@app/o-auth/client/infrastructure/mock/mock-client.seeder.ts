import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopeOptions,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '../../domain/value-objects';
import { OAuthClient } from '../../domain/client.aggregate';
import { clients } from './mock-client.data';
import * as _ from 'lodash';

@Injectable()
export class MockClientSeeder extends MockSeeder<OAuthClient>
{
    public collectionSource: OAuthClient[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const client of _.orderBy(clients, ['id']))
        {
            this.collectionSource.push(
                OAuthClient.register(
                    new ClientId(client.id),
                    new ClientGrantType(client.grantType),
                    new ClientName(client.name),
                    new ClientSecret(client.secret),
                    new ClientAuthUrl(client.authUrl),
                    new ClientRedirect(client.redirect),
                    new ClientScopeOptions(client.scopeOptions),
                    new ClientExpiredAccessToken(client.expiredAccessToken),
                    new ClientExpiredRefreshToken(client.expiredRefreshToken),
                    new ClientIsActive(client.isActive),
                    new ClientIsMaster(client.isMaster),
                    new ClientApplicationIds(client.applicationIds),
                    new ClientCreatedAt({ currentTimestamp: true }),
                    new ClientUpdatedAt({ currentTimestamp: true }),
                    new ClientDeletedAt(null),
                ),
            );
        }
    }
}