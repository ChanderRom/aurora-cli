import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindRefreshTokenByIdQuery } from '@app/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { DeleteRefreshTokenByIdCommand } from '@app/o-auth/refresh-token/application/delete/delete-refresh-token-by-id.command';
import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthDeleteRefreshTokenByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        const refreshToken = await this.queryBus.ask(new FindRefreshTokenByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRefreshTokenByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return refreshToken;
    }
}