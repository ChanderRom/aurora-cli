import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';
import { IamUser, IamUpdateUsersInput } from '@api/graphql';

@Resolver()
@Permissions('iam.user.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamUpdateUsersResolver
{
    constructor(
        private readonly handler: IamUpdateUsersHandler,
    ) {}

    @Mutation('iamUpdateUsers')
    async main(
        @Args('payload') payload: IamUpdateUsersInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}