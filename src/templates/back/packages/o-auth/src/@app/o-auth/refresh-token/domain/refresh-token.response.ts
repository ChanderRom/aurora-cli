import { AccessTokenResponse } from '@app/o-auth/access-token/domain/access-token.response';

export class RefreshTokenResponse
{
    constructor(
        public readonly id: string,
        public readonly accessTokenId: string,
        public readonly token: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly accessToken: AccessTokenResponse,
    ) {}
}