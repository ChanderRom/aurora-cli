import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetUsersQuery } from '@app/iam/user/application/get/get-users.query';
import { IamUser } from '@api/graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamGetUsersHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser[] | IamUserDto[]>
    {
        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}