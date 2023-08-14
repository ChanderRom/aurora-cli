{{
    setVar 'importsArray' (
        array
            (object items=(array 'CQMetadata' 'QueryStatement') path=config.auroraCorePackage)
    )
~}}
{{{ importManager (object imports=importsArray) }}}
export class {{ toPascalCase schema.boundedContextName }}Get{{ toPascalCase schema.moduleNames }}Query
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
