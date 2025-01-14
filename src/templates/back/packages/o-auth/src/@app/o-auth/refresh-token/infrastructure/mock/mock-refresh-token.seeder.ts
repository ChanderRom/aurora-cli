import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { refreshTokens } from './mock-refresh-token.data';
import * as _ from 'lodash';

@Injectable()
export class MockRefreshTokenSeeder extends MockSeeder<OAuthRefreshToken>
{
    public collectionSource: OAuthRefreshToken[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const refreshToken of _.orderBy(refreshTokens, ['id']))
        {
            this.collectionSource.push(
                OAuthRefreshToken.register(
                    new RefreshTokenId(refreshToken.id),
                    new RefreshTokenAccessTokenId(refreshToken.accessTokenId),
                    new RefreshTokenToken(refreshToken.token),
                    new RefreshTokenIsRevoked(refreshToken.isRevoked),
                    new RefreshTokenExpiresAt(refreshToken.expiresAt),
                    new RefreshTokenCreatedAt({ currentTimestamp: true }),
                    new RefreshTokenUpdatedAt({ currentTimestamp: true }),
                    new RefreshTokenDeletedAt(null),
                ),
            );
        }
    }
}