/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Body, Controller, Post } from '@nestjs/common';
// import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
// import { Auditing, AuditingMeta, Timezone } from '{{ config.auroraCorePackage }}';
// import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto, {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto } from '../dto';
// {{#if schema.hasOAuth}}
// import { Auth } from '@aurora/decorators';
// {{/if}}
// {{#if schema.hasTenant}}

// tenant
// import { AccountResponse } from '{{ config.appContainer }}/iam/account/domain/account.response';
// import { TenantPolicy } from '{{ config.appContainer }}/iam/shared/domain/decorators/tenant-policy.decorator';
// import { CurrentAccount } from '../../../shared/decorators/current-account.decorator';
// {{/if}}

// {{ config.appContainer }}
// import { {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler } from '../handlers/{{ toKebabCase schema.boundedContextName }}-create-{{ toKebabCase schema.moduleNames }}.handler';

{{
    setVar 'importsArray' (
        array
            (object items=(array 'Body' 'Controller' 'Post')  path='@nestjs/common')
            (object items=(array 'ApiTags' 'ApiCreatedResponse' 'ApiBody' 'ApiOperation')  path='@nestjs/swagger')
            (object items=(array 'Auditing' 'AuditingMeta' 'Timezone')  path=config.auroraCorePackage)
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) (toPascalCase schema.moduleName) 'Dto')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleName) 'Dto')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/dto')
            )
            (object items=(sumStrings (toCamelCase schema.boundedContextName) 'Mock' (toPascalCase schema.moduleName) 'Data') path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/infrastructure/mock/' (toKebabCase schema.boundedContextName) '-mock-' (toKebabCase schema.moduleName) '.data'))
            (object items=(sumStrings (toPascalCase schema.boundedContextName) 'Create' (toPascalCase schema.moduleNames)) path=(sumStrings config.appContainer '/handlers' (toKebabCase schema.boundedContextName) '-create-' (toKebabCase schema.moduleNames) '.handler')
            
    )
~}}
{{#if schema.hasTenant}}
{{ push importsArray
    (object items='AccountResponse' path=(sumStrings config.appContainer '/iam/account'))
    (object items='TenantPolicy' path=(sumStrings config.appContainer '/iam/shared'))
    (object items='CurrentAccount' path=config.auroraCorePackage)
~}}
{{/if}}
{{#if schema.hasOAuth}}
{{ push importsArray
    (object items='Auth' path='@aurora/decorators')
~}}
{{/if}}
{{#if schema.properties.hasI18n}}
{{ push importsArray
    (object items=(array 'langs') path='@aurora')
~}}
{{/if}}
{{{ importManager (object imports=importsArray) }}}
@ApiTags('[{{ toKebabCase schema.boundedContextName }}] {{ toKebabCase schema.moduleName }}')
@Controller('{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleNames }}/create')
{{#if schema.hasOAuth}}
@Auth('{{ toCamelCase schema.boundedContextName }}.{{ toCamelCase schema.moduleName }}.create')
{{/if}}
export class {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Controller
{
    constructor(
        private readonly handler: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleNames }}Handler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create {{ toKebabCase schema.moduleNames }} in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Dto]})
    @ApiBody({ type: [{{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto]})
    {{#if schema.hasTenant}}
    @TenantPolicy()
    {{/if}}
    async main(
        @Body() payload: {{ toPascalCase schema.boundedContextName }}Create{{ toPascalCase schema.moduleName }}Dto[],
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