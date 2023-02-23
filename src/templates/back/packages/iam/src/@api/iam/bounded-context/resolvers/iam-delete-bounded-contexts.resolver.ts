import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamDeleteBoundedContextsResolver
{
    constructor(
        private readonly handler: IamDeleteBoundedContextsHandler,
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}