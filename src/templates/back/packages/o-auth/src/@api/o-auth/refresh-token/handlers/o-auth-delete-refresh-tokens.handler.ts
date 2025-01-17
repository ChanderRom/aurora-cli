import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetRefreshTokensQuery } from '@app/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { DeleteRefreshTokensCommand } from '@app/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';
import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthDeleteRefreshTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken[] | OAuthRefreshTokenDto[]>
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return refreshTokens;
    }
}