import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetRolesQuery } from '@app/iam/role/application/get/get-roles.query';
import { IamRole } from '@api/graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamGetRolesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole[] | IamRoleDto[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}