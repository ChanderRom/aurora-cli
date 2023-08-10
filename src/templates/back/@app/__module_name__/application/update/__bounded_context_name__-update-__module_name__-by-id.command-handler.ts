/* eslint-disable key-spacing */
{{
    setVar 'importsArray' (
        array
            (object items=(array 'CommandHandler' 'ICommandHandler') path='@nestjs/cqrs')
            (object
                items=
                (
                    array
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdCommand')
                        (sumStrings (toPascalCase schema.boundedContextName) 'Update' (toPascalCase schema.moduleName) 'ByIdService')
                )
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName))
        )
    )
~}}
{{#each schema.properties.valueObjects}}
{{#if (isAllowProperty ../schema.moduleName this) }}
{{
    push ../importsArray
        (object 
            items=
                (sumStrings (toPascalCase ../schema.boundedContextName) (toPascalCase ../schema.moduleName) (addI18nPropertySignature this) (toPascalCase name))
                path=(sumStrings config.appContainer '/' (toKebabCase schema.boundedContextName) '/' (toKebabCase schema.moduleName) '/domain/value-objects')
                oneRowByItem=true
        )
~}}
{{/if}}
{{/each}}
{{{ importManager (object imports=importsArray) }}}
@CommandHandler({{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand)
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommandHandler implements ICommandHandler<{{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand>
{
    constructor(
        private readonly update{{ toPascalCase schema.moduleName }}ByIdService: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(command: {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleName }}ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.update{{ toPascalCase schema.moduleName }}ByIdService.main(
            {
                {{#each schema.properties.updateCommandHandler}}
                {{#if (isAllowProperty ../schema.moduleName this) }}
                {{#if hasTimezone}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}, { {{~#unless nullable}}{{#unlessEq name 'id'}} undefinable: true {{/unlessEq}}{{/unless~}} }, { removeTimezone: command.cQMetadata.timezone }),
                {{else}}
                {{#unless (isI18nAvailableLangsProperty . ../schema.properties)}}
                {{ toCamelCase name }}: new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase ../schema.moduleName }}{{> i18n }}{{ toPascalCase name }}(command.payload.{{ toCamelCase name }}{{#unless nullable}}{{#unlessEq name 'id'}}, { undefinable: true }{{/unlessEq}}{{/unless}}),
                {{/unless}}
                {{/if}}
                {{/if}}
                {{/each}}
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}