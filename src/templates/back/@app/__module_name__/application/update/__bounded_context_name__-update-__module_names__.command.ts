{{
    setVar 'importsArray' (
        array
            (object items=(array 'QueryStatement' 'CQMetadata') path=config.auroraCorePackage)
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Update{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly payload: {
            {{#each schema.properties.updateCommand}}
            {{#if (isAllowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}?: {{ getJavascriptType }};
            {{/if}}
            {{/each}}
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
