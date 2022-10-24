import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamGetTenantsHandler } from '../handlers/iam-get-tenants.handler';
import { IamTenant } from 'src/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamGetTenantsResolver
{
    constructor(
        private readonly handler: IamGetTenantsHandler,
    ) {}

    @Query('iamGetTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}