/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post{{#if schema.hasOAuth}}, UseGuards{{/if}} } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { {{#if schema.hasOAuth}}AuthenticationGuard, AuthorizationGuard, Permissions, {{/if}}Timezone } from '{{ config.auroraCorePackage }}';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto, {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto } from '../dto';
{{#if schema.hasAuditing}}

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';
{{/if}}
{{#if schema.hasTenant}}

// tenant
import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
import { TenantPolicy } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
{{/if}}

// {{ config.appContainer }}
import { {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-upsert-{{ toKebabCase schema.moduleName }}.handler';

@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/upsert')
{{#if schema.hasOAuth}}
@Permissions('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.upsert')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Upsert{{ toPascalCase schema.moduleName }}Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert {{ toKebabCase schema.moduleName }}' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto })
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdDto,
        {{#if schema.hasTenant}}
        @CurrentAccount() account: AccountResponse,
        {{/if}}
        @Timezone() timezone?: string,
        {{#if schema.hasAuditing}}
        @Auditing() auditing?: AuditingMeta,
        {{/if}}
    )
    {
        return await this.handler.main(
            payload,
            {{#if schema.hasTenant}}
            account,
            {{/if}}
            timezone,
            {{#if schema.hasAuditing}}
            auditing,
            {{/if}}
        );
    }
}