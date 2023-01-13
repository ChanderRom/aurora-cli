import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// @app
import { CommonCreateLangsHandler } from '../handlers/common-create-langs.handler';
import { CommonCreateLangInput } from '@api/graphql';

@Resolver()
export class CommonCreateLangsResolver
{
    constructor(
        private readonly handler: CommonCreateLangsHandler,
    ) {}

    @Mutation('commonCreateLangs')
    async main(
        @Args('payload') payload: CommonCreateLangInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}