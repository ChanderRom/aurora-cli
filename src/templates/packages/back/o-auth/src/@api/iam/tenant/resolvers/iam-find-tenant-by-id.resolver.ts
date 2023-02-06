import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';
import { IamTenant } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindTenantByIdResolver
{
    constructor(
        private readonly handler: IamFindTenantByIdHandler,
    ) {}

    @Query('iamFindTenantById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}