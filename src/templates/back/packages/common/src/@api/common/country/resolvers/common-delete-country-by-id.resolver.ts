import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ContentLanguage, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { CommonDeleteCountryByIdHandler } from '../handlers/common-delete-country-by-id.handler';
import { CommonCountry } from '@api/graphql';

@Resolver()
export class CommonDeleteCountryByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteCountryByIdHandler,
    ) {}

    @Mutation('commonDeleteCountryById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}